export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section id="home" className="relative pt-20 pb-32 flex items-center justify-center min-h-[90vh] overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-400/20 dark:bg-blue-900/20 blur-[120px]" />
          <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-purple-400/20 dark:bg-purple-900/20 blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-900/30 text-sm font-medium text-blue-800 dark:text-blue-300 mb-8 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
            Hire Top Developers Instantly
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
            Build the Future with <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Exceptional Talent</span>
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
            We connect visionary companies with world-class freelance web and mobile app developers. Fast, reliable, and perfectly tailored to your needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#services" className="px-8 py-4 text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-blue-500/50 transition-all transform hover:-translate-y-1">
              Hire a Developer
            </a>
            <a href="#resume" className="px-8 py-4 text-base font-medium rounded-full text-blue-700 bg-white dark:text-gray-200 dark:bg-[#020617] border-2 border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all transform hover:-translate-y-1">
              Join as a Developer
            </a>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-24 bg-gray-50/50 dark:bg-[#0a0f1d]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-3xl transform rotate-3 opacity-20 blur-lg"></div>
              <div className="relative bg-white dark:bg-[#111827] rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-xl">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl">
                      <h3 className="text-4xl font-bold text-blue-600 dark:text-blue-400">500+</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Projects Delivered</p>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-2xl">
                      <h3 className="text-4xl font-bold text-purple-600 dark:text-purple-400">98%</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Client Satisfaction</p>
                    </div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-2xl">
                      <h3 className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">200+</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Vetted Developers</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-sm font-semibold text-blue-600 tracking-wide uppercase mb-3">About Us</h2>
              <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
                Bridging the Gap Between Talent and Opportunity
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                DevHire was founded with a single mission: to provide companies with access to top-tier engineering talent without the hassle of traditional hiring. 
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                We stringently vet every developer in our network, ensuring that whether you need a complex responsive web application or a cutting-edge mobile app, you get precisely the expertise you require.
              </p>
              <ul className="space-y-4">
                {[
                  'Strict vetting process for all engineers',
                  'Flexible engagements (hourly, part-time, full-time)',
                  'Seamless integration with your existing team',
                  'Dedicated support throughout your project'
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <svg className="h-6 w-6 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-semibold text-blue-600 tracking-wide uppercase mb-3">Our Services</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
              Expertise Across All Platforms
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              We provide specialized developers who are masters of modern technologies and frameworks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                <svg className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Web Development</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Front-end, back-end, and full-stack engineers experienced in React, Next.js, Node.js, Python, and more. Creating responsive, scalable web applications.
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors">
                <svg className="w-8 h-8 text-purple-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Mobile App Development</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Native iOS (Swift), Android (Kotlin), and cross-platform (React Native, Flutter) experts building engaging, high-performance mobile experiences.
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors">
                <svg className="w-8 h-8 text-indigo-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">UI/UX Design</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Talented designers who create intuitive, user-centric interfaces and beautiful visual experiences that elevate your brand and drive engagement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Careers / Open Positions */}
      <section id="careers" className="py-24 bg-gray-50/50 dark:bg-[#0a0f1d]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16">
            <div>
              <h2 className="text-sm font-semibold text-blue-600 tracking-wide uppercase mb-3">Careers</h2>
              <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
                Open Positions
              </h3>
            </div>
            <a href="#resume" className="mt-6 md:mt-0 px-6 py-3 border border-transparent text-sm font-medium rounded-full text-white bg-gray-900 dark:bg-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
              View All Jobs
            </a>
          </div>

          <div className="space-y-4">
            {[
              {
                title: "Senior Full-Stack Next.js Developer",
                type: "Full-time • Remote",
                salary: "$120k - $160k",
                tag: "Hot"
              },
              {
                title: "React Native Mobile Engineer",
                type: "Contract • Remote",
                salary: "$80 - $120 / hr",
                tag: "New"
              },
              {
                title: "UI/UX Designer",
                type: "Part-time • Remote",
                salary: "$60 - $90 / hr",
                tag: ""
              }
            ].map((job, idx) => (
              <div key={idx} className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 rounded-xl p-6 md:p-8 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center hover:border-blue-500 dark:hover:border-blue-500 transition-colors group cursor-pointer">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {job.title}
                    </h4>
                    {job.tag && (
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${job.tag === 'Hot' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'}`}>
                        {job.tag}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      {job.type}
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {job.salary}
                    </span>
                  </div>
                </div>
                <div className="w-full md:w-auto">
                  <a href="#resume" className="block w-full text-center px-6 py-2.5 border border-gray-200 dark:border-gray-700 rounded-full text-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-800 transition-all">
                    Apply Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resume Submission Section */}
      <section id="resume" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600 dark:bg-blue-900 transform -skew-y-2 origin-top-left z-0"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white dark:bg-[#111827] rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 dark:border-gray-800">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
                Submit Your Resume
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Join our network of elite developers and get matched with top companies. Fill out the form below to get started.
              </p>
            </div>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First name</label>
                  <input type="text" id="first-name" className="w-full rounded-xl border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#020617] px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="John" />
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last name</label>
                  <input type="text" id="last-name" className="w-full rounded-xl border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#020617] px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="Doe" />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email address</label>
                <input type="email" id="email" className="w-full rounded-xl border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#020617] px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="john@example.com" />
              </div>

              <div>
                <label htmlFor="skills" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Primary Skills</label>
                <input type="text" id="skills" className="w-full rounded-xl border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#020617] px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="React, Next.js, Node.js" />
              </div>

              <div>
                <label htmlFor="resume-file" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Resume / CV</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-700 border-dashed rounded-xl bg-gray-50 dark:bg-[#020617] hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors cursor-pointer group">
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400 group-hover:text-blue-500 transition-colors" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4v-4m4-4h-4m-4-10v10m12-10a4 4 0 00-4-4h-4m0 0l-4 4m4-4l4 4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600 dark:text-gray-400 justify-center">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-transparent rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">PDF, DOCX up to 10MB</p>
                  </div>
                </div>
              </div>

              <div>
                <button type="submit" className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all">
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white dark:bg-[#020617]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-semibold text-blue-600 tracking-wide uppercase mb-3">Contact Us</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
              Let's Discuss Your Next Great Project
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Ready to hire top developers? Get in touch and let us help you build your dream team.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
            <div>
              <form className="space-y-6">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company name or Your name</label>
                  <input type="text" id="contact-name" className="w-full rounded-xl border-gray-300 dark:border-gray-800 bg-gray-50 dark:bg-[#111827] px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="Acme Corp" />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Work email address</label>
                  <input type="email" id="contact-email" className="w-full rounded-xl border-gray-300 dark:border-gray-800 bg-gray-50 dark:bg-[#111827] px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="hello@acme.com" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                  <textarea id="message" rows={4} className="w-full rounded-xl border-gray-300 dark:border-gray-800 bg-gray-50 dark:bg-[#111827] px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="Tell us about your project requirements..."></textarea>
                </div>
                <button type="submit" className="w-full px-6 py-4 rounded-xl text-white bg-gray-900 dark:bg-white dark:text-gray-900 font-medium text-base hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                  Send Message
                </button>
              </form>
            </div>
            
            <div className="flex flex-col justify-center">
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                  </div>
                  <div className="ml-6">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">Email Us</h4>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">Our friendly team is here to help.</p>
                    <p className="mt-1 text-blue-600 font-medium">hello@devhire.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                  </div>
                  <div className="ml-6">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">Office</h4>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">Come say hello at our HQ.</p>
                    <p className="mt-1 text-gray-900 dark:text-gray-300 font-medium">100 Tech Hub Blvd, San Francisco, CA 94107</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    </div>
                  </div>
                  <div className="ml-6">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">Phone</h4>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">Mon-Fri from 8am to 5pm.</p>
                    <p className="mt-1 text-gray-900 dark:text-gray-300 font-medium">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
