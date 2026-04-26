import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// Initialize Resend with the API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// Initialize Google Auth for Sheets
const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_CLIENT_EMAIL,
  // Ensure that newlines in the private key are handled correctly from the .env file
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets',
  ],
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const type = formData.get('type') as string;

    if (type === 'client') {
      const name = formData.get('name') as string;
      const company = formData.get('company') as string;
      const email = formData.get('email') as string;
      const role = formData.get('role') as string;
      const openings = formData.get('openings') as string;
      const experienceRequired = formData.get('experienceRequired') as string;
      const timeline = formData.get('timeline') as string;
      const details = formData.get('details') as string;

      // 1. Send Email via Resend
      const emailPromise = resend.emails.send({
        from: 'Hyrio Website <notifications@hyrio.co.in>',
        to: ['hr@hyrio.co.in'], // Where emails will be sent
        subject: `New Client Inquiry: ${name} at ${company}`,
        html: `
          <div style="font-family: sans-serif; line-height: 1.6; max-w-xl">
            <h2 style="color: #2563eb;">New Client Lead from Hyrio Website</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Company:</strong> ${company}</p>
            <p><strong>Work Email:</strong> ${email}</p>
            <p><strong>Role Hiring For:</strong> ${role}</p>
            <p><strong>Number of Openings:</strong> ${openings}</p>
            <p><strong>Experience Required:</strong> ${experienceRequired}</p>
            <p><strong>Timeline:</strong> ${timeline}</p>
            <p><strong>Additional Details:</strong> ${details || 'None provided'}</p>
          </div>
        `,
        replyTo: email,
      });

      // 2. Append Row to Google Sheets
      const sheetPromise = (async () => {
        try {
          if (!process.env.GOOGLE_SHEET_CLIENTS_ID) return;
          const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_CLIENTS_ID, serviceAccountAuth);
          await doc.loadInfo();
          const sheet = doc.sheetsByIndex[0]; // the first sheet tab
          
          await sheet.addRow({
            'Name': name,
            'Company': company,
            'Email': email,
            'Role': role,
            'Openings': openings,
            'Experience Required': experienceRequired,
            'Timeline': timeline,
            'Details': details || ''
          });
          console.log("Successfully added Client to Google Sheet");
        } catch (error) {
          console.error("Failed to append to Client Google Sheet:", error);
        }
      })();

      // Run both tasks simultaneously
      const [emailResult] = await Promise.all([emailPromise, sheetPromise]);

      if (emailResult.error) {
        return NextResponse.json({ error: emailResult.error }, { status: 400 });
      }

      return NextResponse.json({ success: true, data: emailResult.data });

    } else if (type === 'candidate') {
      const firstName = formData.get('firstName') as string;
      const lastName = formData.get('lastName') as string;
      const email = formData.get('email') as string;
      const phone = formData.get('phone') as string;
      const role = formData.get('role') as string;
      const experience = formData.get('experience') as string;
      const linkedin = formData.get('linkedin') as string;
      const file = formData.get('file') as File | null;

      // Handle resume file attachment
      let attachments = [];
      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        attachments.push({
          filename: file.name,
          content: buffer,
        });
      }

      // 1. Send Email via Resend
      const emailPromise = resend.emails.send({
        from: 'Hyrio Website <notifications@hyrio.co.in>',
        to: ['hr@hyrio.co.in'],
        subject: `New Candidate Profile: ${firstName} ${lastName} - ${role}`,
        html: `
          <div style="font-family: sans-serif; line-height: 1.6;">
            <h2 style="color: #9333ea;">New Candidate Profile Submission</h2>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Target Role:</strong> ${role}</p>
            <p><strong>Experience:</strong> ${experience}</p>
            <p><strong>LinkedIn:</strong> ${linkedin ? `<a href="${linkedin}">${linkedin}</a>` : 'Not provided'}</p>
            <p><em>Resume is attached to this email.</em></p>
          </div>
        `,
        attachments: attachments.length > 0 ? attachments : undefined,
        replyTo: email,
      });

      // 2. Append Row to Google Sheets
      const sheetPromise = (async () => {
        try {
          if (!process.env.GOOGLE_SHEET_CANDIDATES_ID) return;
          const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_CANDIDATES_ID, serviceAccountAuth);
          await doc.loadInfo();
          const sheet = doc.sheetsByIndex[0]; // the first sheet tab
          
          await sheet.addRow({
            'First Name': firstName,
            'Last Name': lastName,
            'Email': email,
            'Phone': phone,
            'Role': role,
            'Experience': experience,
            'LinkedIn': linkedin || 'None',
            'Resume': 'Attached in Email' // Note: We do not upload the physical file to Sheets, we note it's in the email
          });
          console.log("Successfully added Candidate to Google Sheet");
        } catch (error) {
          console.error("Failed to append to Candidate Google Sheet:", error);
        }
      })();

      // Run both tasks simultaneously
      const [emailResult] = await Promise.all([emailPromise, sheetPromise]);

      if (emailResult.error) {
        return NextResponse.json({ error: emailResult.error }, { status: 400 });
      }

      return NextResponse.json({ success: true, data: emailResult.data });
    } else {
      return NextResponse.json({ error: 'Invalid form type' }, { status: 400 });
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
