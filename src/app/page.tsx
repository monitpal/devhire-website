"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { useState } from "react";

export default function Home() {
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // --- MODAL STATE ---
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "success" as "success" | "error"
  });

  const closeModal = () => setModalConfig(prev => ({ ...prev, isOpen: false }));

  // --- CANDIDATE FORM STATE & VALIDATION ---
  const [candidateData, setCandidateData] = useState({
    firstName: "", lastName: "", email: "", phone: "", role: "", experience: "", linkedin: "", file: null as File | null
  });
  const [candidateErrors, setCandidateErrors] = useState<Record<string, string>>({});
  const [isCandidateSubmitting, setIsCandidateSubmitting] = useState(false);

  const handleCandidateChange = (field: string, value: string | File | null) => {
    setCandidateData(prev => ({ ...prev, [field]: value }));
    if (candidateErrors[field]) {
      setCandidateErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleCandidateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!candidateData.firstName) errors.firstName = "First name is required";
    if (!candidateData.lastName) errors.lastName = "Last name is required";
    if (!candidateData.email || !/\S+@\S+\.\S+/.test(candidateData.email)) errors.email = "Valid email is required";
    
    const phoneDigits = candidateData.phone.replace(/\D/g, '');
    if (!candidateData.phone) {
      errors.phone = "Phone number is required";
    } else if (phoneDigits.length !== 10) {
      errors.phone = "Must be exactly 10 digits";
    }

    if (!candidateData.role) errors.role = "Target role is required";
    if (!candidateData.experience) errors.experience = "Experience is required";
    if (!candidateData.file) errors.file = "Resume is required";

    if (Object.keys(errors).length > 0) {
      setCandidateErrors(errors);
      return;
    }

    setCandidateErrors({});
    setIsCandidateSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('type', 'candidate');
      formData.append('firstName', candidateData.firstName);
      formData.append('lastName', candidateData.lastName);
      formData.append('email', candidateData.email);
      formData.append('phone', candidateData.phone);
      formData.append('role', candidateData.role);
      formData.append('experience', candidateData.experience);
      if (candidateData.linkedin) formData.append('linkedin', candidateData.linkedin);
      if (candidateData.file) formData.append('file', candidateData.file);

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to send');

      setModalConfig({
        isOpen: true,
        title: "Application Received!",
        message: "Thank you! Your profile has been submitted successfully.",
        type: "success"
      });
      setCandidateData({ firstName: "", lastName: "", email: "", phone: "", role: "", experience: "", linkedin: "", file: null });
    } catch (error) {
      console.error(error);
      setModalConfig({
        isOpen: true,
        title: "Submission Failed",
        message: "Something went wrong. Please try again later.",
        type: "error"
      });
    } finally {
      setIsCandidateSubmitting(false);
    }
  };

  // --- CLIENT FORM STATE & VALIDATION ---
  const [clientData, setClientData] = useState({
    name: "", company: "", email: "", openings: "", role: "", experienceRequired: "", timeline: "ASAP", details: ""
  });
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});
  const [isClientSubmitting, setIsClientSubmitting] = useState(false);

  const handleClientChange = (field: string, value: string) => {
    setClientData(prev => ({ ...prev, [field]: value }));
    if (clientErrors[field]) {
      setClientErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleClientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!clientData.name) errors.name = "Name is required";
    if (!clientData.company) errors.company = "Company is required";
    if (!clientData.email || !/\S+@\S+\.\S+/.test(clientData.email)) errors.email = "Valid work email is required";
    if (!clientData.openings || isNaN(Number(clientData.openings)) || Number(clientData.openings) < 1) errors.openings = "Valid number required";
    if (!clientData.role) errors.role = "Role is required";
    if (!clientData.experienceRequired) errors.experienceRequired = "Experience is required";

    if (Object.keys(errors).length > 0) {
      setClientErrors(errors);
      return;
    }

    setClientErrors({});
    setIsClientSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('type', 'client');
      formData.append('name', clientData.name);
      formData.append('company', clientData.company);
      formData.append('email', clientData.email);
      formData.append('openings', clientData.openings);
      formData.append('role', clientData.role);
      formData.append('experienceRequired', clientData.experienceRequired);
      formData.append('timeline', clientData.timeline);
      if (clientData.details) formData.append('details', clientData.details);

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to send');

      setModalConfig({
        isOpen: true,
        title: "Inquiry Received!",
        message: "Thank you! We have received your inquiry and will be in touch shortly.",
        type: "success"
      });
      setClientData({ name: "", company: "", email: "", openings: "", role: "", experienceRequired: "", timeline: "ASAP", details: "" });
    } catch (error) {
      console.error(error);
      setModalConfig({
        isOpen: true,
        title: "Submission Failed",
        message: "Something went wrong. Please try again later.",
        type: "error"
      });
    } finally {
      setIsClientSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section id="home" className="relative pt-20 pb-32 flex items-center justify-center min-h-[90vh] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-400/20 dark:bg-blue-900/20 blur-[120px]" />
          <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-purple-400/20 dark:bg-purple-900/20 blur-[120px]" />
        </div>

        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={fadeInUp} className="inline-flex items-center px-4 py-2 rounded-full border border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-900/30 text-sm font-medium text-blue-800 dark:text-blue-300 mb-8 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
            Hyrio AI-powered Recruitment agency
          </motion.div>
          <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Smarter Hiring.</span><br className="hidden md:block" />
            Faster Teams. Zero Compromise.
          </motion.h1>
          <motion.p variants={fadeInUp} className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
            The right person. The right role. Delivered faster than any traditional recruiter ever could without the commission-sized price tag.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#contact" className="px-8 py-4 text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-blue-500/50 transition-all transform hover:-translate-y-1">
              Start Hiring Now &rarr;
            </a>
            <a href="#resume" className="px-8 py-4 text-base font-medium rounded-full text-blue-700 bg-white dark:text-gray-200 dark:bg-[#020617] border-2 border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all transform hover:-translate-y-1">
              Join as a Candidate
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-24 bg-gray-50/50 dark:bg-[#0a0f1d]/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-3xl transform rotate-3 opacity-20 blur-lg"></div>
              <div className="relative bg-white dark:bg-[#111827] rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-xl">
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">The Person Behind Hyrio</h4>
                <h5 className="text-xl font-medium text-blue-600 dark:text-blue-400 italic mb-6">
                  &quot;I Spent Years Being the Only HR Person in the Room. I Know Exactly What That Costs You.&quot;
                </h5>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Hi, I&apos;m Urvashi Mandaliya &mdash; founder of Hyrio. I spent years as the only HR person at tech companies and digital agencies. I&apos;ve screened hundreds of candidates, built teams from scratch, and watched businesses waste months and lakhs on the wrong hires.
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  I started Hyrio because I knew there was a smarter way. We use AI to screen, match, and shortlist candidates &mdash; so by the time you meet someone, they&apos;re already vetted.
                </p>
                <div className="border-t border-gray-100 dark:border-gray-800 pt-6">
                  <p className="font-semibold text-gray-900 dark:text-white">Urvashi Mandaliya</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Founder, Hyrio</p>
                </div>
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="order-1 lg:order-2">
              <motion.h2 variants={fadeInUp} className="text-sm font-semibold text-blue-600 tracking-wide uppercase mb-3">Who We Are</motion.h2>
              <motion.h3 variants={fadeInUp} className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
                We Didn&apos;t Build Another Recruitment Agency. We Built What Replaces It.
              </motion.h3>
              <motion.p variants={fadeInUp} className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Hyrio was born from one simple frustration &mdash; businesses were paying lakhs to traditional recruiters and still getting slow results, wrong fits, and zero transparency.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Hyrio is an AI-powered talent acquisition firm built specifically for tech startups and digital marketing agencies &mdash; the companies that move fast, think sharp, and can&apos;t afford a single wrong hire. We use AI to screen candidates, match by data, and conduct first-round interviews.
              </motion.p>
              <motion.div variants={fadeInUp} className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800">
                <p className="text-lg font-medium text-blue-800 dark:text-blue-300 italic">
                  &quot;We&apos;re not here to improve the old way. We&apos;re here to make it irrelevant.&quot;
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-50 dark:bg-blue-900/10 blur-[80px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-sm font-semibold text-blue-600 tracking-wide uppercase mb-3">What You Get</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
              The Right People.<br/>Without the Usual Pain.
            </h3>
          </motion.div>

          <div className="space-y-12">
            {[
              {
                title: "Zero Shortlisting Time",
                desc: "Your inbox never gets flooded with irrelevant profiles again. Every candidate you see has already been evaluated and ranked. You review the best. We handle the rest.",
                color: "text-blue-600",
                bg: "bg-blue-50 dark:bg-blue-900/20",
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              },
              {
                title: "Interview-Ready Candidates",
                desc: "They've already been assessed for communication, role fit, and culture alignment. No surprises. No wasted afternoons. You lead the final call.",
                color: "text-purple-600",
                bg: "bg-purple-50 dark:bg-purple-900/20",
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              },
              {
                title: "Niche Talent",
                desc: "Developers, designers, performance marketers, content strategists — we know these roles inside out and deliver people who can actually do the work.",
                color: "text-indigo-600",
                bg: "bg-indigo-50 dark:bg-indigo-900/20",
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              },
              {
                title: "Startup Speed",
                desc: "Fast-moving businesses need fast-moving hiring. We deliver shortlisted, vetted candidates without bloated agency fees or slow timelines.",
                color: "text-pink-600",
                bg: "bg-pink-50 dark:bg-pink-900/20",
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              },
              {
                title: "Clear Picture of Every Candidate",
                desc: "Every shortlisted profile comes with a detailed summary — strengths, gaps, salary expectations, and role alignment. Clarity before the first handshake.",
                color: "text-teal-600",
                bg: "bg-teal-50 dark:bg-teal-900/20",
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              }
            ].map((service, idx) => (
              <motion.div 
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0, x: idx % 2 === 0 ? -50 : 50 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
                }}
                className={`flex flex-col ${idx % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-16 p-8 rounded-3xl bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 group`}
              >
                <div className={`w-20 h-20 md:w-32 md:h-32 shrink-0 ${service.bg} rounded-3xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300`}>
                  <svg className={`w-10 h-10 md:w-16 md:h-16 ${service.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {service.icon}
                  </svg>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h4 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {service.title}
                  </h4>
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    {service.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section id="careers" className="py-24 bg-gray-50/50 dark:bg-[#0a0f1d]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-16 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-white/5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30 mix-blend-overlay"></div>
            <div className="relative z-10">
              <h2 className="text-sm font-semibold text-blue-200 tracking-wide uppercase mb-3">Join Us</h2>
              <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
                Work at the Intersection of Human Ambition and Machine Intelligence.
              </h3>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                We&apos;re not just changing how businesses hire &mdash; we&apos;re building the company that makes the old way obsolete. At Hyrio you get ground-floor opportunity, real ownership, and zero corporate nonsense.
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 inline-block mb-10 border border-white/20 hover:bg-white/20 transition-colors">
                <p className="text-lg font-medium text-white italic">
                  &quot;We hire for hunger, attitude, and potential &mdash; not just experience.&quot;
                </p>
              </div>
              <div>
                <a href="#resume" className="inline-block px-8 py-4 text-lg font-bold rounded-full text-blue-600 bg-white hover:bg-blue-50 shadow-lg transition-all transform hover:-translate-y-1">
                  Send Us Your Profile &rarr;
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Resume Submission Section */}
      <section id="resume" className="py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="bg-white dark:bg-[#111827] rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 dark:border-gray-800">
            <div className="text-center mb-10">
              <h2 className="text-sm font-semibold text-blue-600 tracking-wide uppercase mb-3">Submit Profile</h2>
              <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
                Join the Hyrio Network
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We hire for hunger, attitude, and potential. Fill out the form below to get started.
              </p>
            </div>
            
            <form onSubmit={handleCandidateSubmit} className="space-y-6" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First name *</label>
                  <input type="text" value={candidateData.firstName} onChange={e => handleCandidateChange('firstName', e.target.value)} className={`w-full rounded-xl border ${candidateErrors.firstName ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-gray-50 dark:bg-[#020617] px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all`} placeholder="John" />
                  {candidateErrors.firstName && <p className="text-red-500 text-xs mt-1">{candidateErrors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last name *</label>
                  <input type="text" value={candidateData.lastName} onChange={e => handleCandidateChange('lastName', e.target.value)} className={`w-full rounded-xl border ${candidateErrors.lastName ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-gray-50 dark:bg-[#020617] px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all`} placeholder="Doe" />
                  {candidateErrors.lastName && <p className="text-red-500 text-xs mt-1">{candidateErrors.lastName}</p>}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email address *</label>
                  <input type="email" value={candidateData.email} onChange={e => handleCandidateChange('email', e.target.value)} className={`w-full rounded-xl border ${candidateErrors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-gray-50 dark:bg-[#020617] px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all`} placeholder="john@example.com" />
                  {candidateErrors.email && <p className="text-red-500 text-xs mt-1">{candidateErrors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number *</label>
                  <input type="tel" maxLength={10} value={candidateData.phone} onChange={e => handleCandidateChange('phone', e.target.value.replace(/\D/g, '').slice(0, 10))} className={`w-full rounded-xl border ${candidateErrors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-gray-50 dark:bg-[#020617] px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all`} placeholder="9876543210" />
                  {candidateErrors.phone && <p className="text-red-500 text-xs mt-1">{candidateErrors.phone}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Target Role *</label>
                  <input type="text" value={candidateData.role} onChange={e => handleCandidateChange('role', e.target.value)} className={`w-full rounded-xl border ${candidateErrors.role ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-gray-50 dark:bg-[#020617] px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all`} placeholder="e.g. Frontend Developer" />
                  {candidateErrors.role && <p className="text-red-500 text-xs mt-1">{candidateErrors.role}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Years of Experience *</label>
                  <select value={candidateData.experience} onChange={e => handleCandidateChange('experience', e.target.value)} className={`w-full rounded-xl border ${candidateErrors.experience ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-gray-50 dark:bg-[#020617] px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all`}>
                    <option value="">Select experience</option>
                    <option value="0-1">0-1 Years</option>
                    <option value="1-3">1-3 Years</option>
                    <option value="3-5">3-5 Years</option>
                    <option value="5-7">5-7 Years</option>
                    <option value="7-10">7-10 Years</option>
                    <option value="10+">10+ Years</option>
                  </select>
                  {candidateErrors.experience && <p className="text-red-500 text-xs mt-1">{candidateErrors.experience}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">LinkedIn Profile (Optional)</label>
                <input type="url" value={candidateData.linkedin} onChange={e => handleCandidateChange('linkedin', e.target.value)} className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#020617] px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="https://linkedin.com/in/johndoe" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Resume / CV *</label>
                <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${candidateErrors.file ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} border-dashed rounded-xl bg-gray-50 dark:bg-[#020617] hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors cursor-pointer group`}>
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400 group-hover:text-blue-500 transition-colors" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4v-4m4-4h-4m-4-10v10m12-10a4 4 0 00-4-4h-4m0 0l-4 4m4-4l4 4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600 dark:text-gray-400 justify-center">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-transparent rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                        <span>{candidateData.file ? candidateData.file.name : "Upload a file"}</span>
                        <input id="file-upload" type="file" className="sr-only" onChange={e => handleCandidateChange('file', e.target.files ? e.target.files[0] : null)} />
                      </label>
                      {!candidateData.file && <p className="pl-1">or drag and drop</p>}
                    </div>
                    {!candidateData.file && <p className="text-xs text-gray-500 dark:text-gray-400">PDF, DOCX up to 10MB</p>}
                  </div>
                </div>
                {candidateErrors.file && <p className="text-red-500 text-xs mt-1">{candidateErrors.file}</p>}
              </div>

              <div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={isCandidateSubmitting} className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                  {isCandidateSubmitting ? "Sending..." : "Submit Application"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white dark:bg-[#020617] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-semibold text-blue-600 tracking-wide uppercase mb-3">Let&apos;s Talk</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
              Your Next Great Hire Is One Conversation Away.
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Whether you need one specialist or an entire team &mdash; we&apos;re ready to move. No long processes. No runaround. Just results.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } }}>
              <form onSubmit={handleClientSubmit} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Name *</label>
                    <input type="text" value={clientData.name} onChange={e => handleClientChange('name', e.target.value)} className={`w-full rounded-xl border ${clientErrors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-800'} bg-gray-50 dark:bg-[#111827] px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all`} placeholder="John Doe" />
                    {clientErrors.name && <p className="text-red-500 text-xs mt-1">{clientErrors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company Name *</label>
                    <input type="text" value={clientData.company} onChange={e => handleClientChange('company', e.target.value)} className={`w-full rounded-xl border ${clientErrors.company ? 'border-red-500' : 'border-gray-300 dark:border-gray-800'} bg-gray-50 dark:bg-[#111827] px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all`} placeholder="Acme Corp" />
                    {clientErrors.company && <p className="text-red-500 text-xs mt-1">{clientErrors.company}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Work Email *</label>
                  <input type="email" value={clientData.email} onChange={e => handleClientChange('email', e.target.value)} className={`w-full rounded-xl border ${clientErrors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-800'} bg-gray-50 dark:bg-[#111827] px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all`} placeholder="john@acme.com" />
                  {clientErrors.email && <p className="text-red-500 text-xs mt-1">{clientErrors.email}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role You&apos;re Hiring For *</label>
                    <input type="text" value={clientData.role} onChange={e => handleClientChange('role', e.target.value)} className={`w-full rounded-xl border ${clientErrors.role ? 'border-red-500' : 'border-gray-300 dark:border-gray-800'} bg-gray-50 dark:bg-[#111827] px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all`} placeholder="e.g. Senior React Developer" />
                    {clientErrors.role && <p className="text-red-500 text-xs mt-1">{clientErrors.role}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Number of Openings *</label>
                    <input type="number" min="1" value={clientData.openings} onChange={e => handleClientChange('openings', e.target.value)} className={`w-full rounded-xl border ${clientErrors.openings ? 'border-red-500' : 'border-gray-300 dark:border-gray-800'} bg-gray-50 dark:bg-[#111827] px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all`} placeholder="e.g. 2" />
                    {clientErrors.openings && <p className="text-red-500 text-xs mt-1">{clientErrors.openings}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Experience Required *</label>
                    <select value={clientData.experienceRequired} onChange={e => handleClientChange('experienceRequired', e.target.value)} className={`w-full rounded-xl border ${clientErrors.experienceRequired ? 'border-red-500' : 'border-gray-300 dark:border-gray-800'} bg-gray-50 dark:bg-[#111827] px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer`}>
                      <option value="">Select experience</option>
                      <option value="0-1">0-1 Years</option>
                      <option value="1-3">1-3 Years</option>
                      <option value="3-5">3-5 Years</option>
                      <option value="5-10">5-10 Years</option>
                      <option value="10+">10+ Years</option>
                    </select>
                    {clientErrors.experienceRequired && <p className="text-red-500 text-xs mt-1">{clientErrors.experienceRequired}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Timeline</label>
                    <select value={clientData.timeline} onChange={e => handleClientChange('timeline', e.target.value)} className="w-full rounded-xl border border-gray-300 dark:border-gray-800 bg-gray-50 dark:bg-[#111827] px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer">
                      <option>ASAP</option>
                      <option>Within 1 Month</option>
                      <option>Within 3 Months</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Additional Project Details (Optional)</label>
                  <textarea rows={3} value={clientData.details} onChange={e => handleClientChange('details', e.target.value)} className="w-full rounded-xl border border-gray-300 dark:border-gray-800 bg-gray-50 dark:bg-[#111827] px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Tell us more about the tech stack or product..." />
                </div>

                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={isClientSubmitting} className="w-full px-6 py-4 rounded-xl text-white bg-blue-600 font-bold text-base hover:bg-blue-700 disabled:opacity-70 transition-colors shadow-lg hover:shadow-blue-500/30">
                  {isClientSubmitting ? "Sending..." : "Start Hiring \u2192"}
                </motion.button>
              </form>
            </motion.div>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } }} className="flex flex-col justify-center">
              <div className="space-y-8">
                <div className="flex items-start group">
                  <div className="flex-shrink-0 transform group-hover:scale-110 transition-transform">
                    <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 shadow-sm border border-blue-200 dark:border-blue-800">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    </div>
                  </div>
                  <div className="ml-6">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">Phone</h4>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">Call us directly.</p>
                    <p className="mt-1 text-gray-900 dark:text-gray-300 font-medium">+91 74360 31424</p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="flex-shrink-0 transform group-hover:scale-110 transition-transform">
                    <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 shadow-sm border border-purple-200 dark:border-purple-800">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                  </div>
                  <div className="ml-6">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">Location</h4>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">Visit our office.</p>
                    <p className="mt-1 text-gray-900 dark:text-gray-300 font-medium">Ahmedabad, Gujarat, India</p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="flex-shrink-0 transform group-hover:scale-110 transition-transform">
                    <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 shadow-sm border border-indigo-200 dark:border-indigo-800">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                  </div>
                  <div className="ml-6">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">Email Us</h4>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">Our friendly team is here to help.</p>
                    <a href="mailto:hr@hyrio.co.in" className="mt-1 inline-block text-blue-600 font-medium hover:text-blue-500 transition-colors">hr@hyrio.co.in</a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Global Notification Modal */}
      <AnimatePresence>
        {modalConfig.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0f1d]/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-[#111827] rounded-3xl p-8 max-w-md w-full shadow-2xl border border-gray-200 dark:border-gray-800 text-center relative overflow-hidden"
            >
              {/* Top Accent Line */}
              <div className={`absolute top-0 left-0 w-full h-2 ${modalConfig.type === 'success' ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gradient-to-r from-red-500 to-pink-500'}`}></div>
              
              {/* Icon Circle */}
              <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-6 ${modalConfig.type === 'success' ? 'bg-blue-50 dark:bg-blue-900/30' : 'bg-red-50 dark:bg-red-900/30'}`}>
                {modalConfig.type === 'success' ? (
                  <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {modalConfig.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                {modalConfig.message}
              </p>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={closeModal}
                className="w-full py-4 px-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:focus:ring-white shadow-lg"
              >
                Okay
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
