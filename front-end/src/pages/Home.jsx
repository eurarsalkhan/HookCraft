import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../pages/logo.png"; // adjust path if needed


// Minimal inline SVG icons to avoid runtime issues with external icon libraries
function Icon({ children, size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {children}
    </svg>
  );
}

function Zap({ size = 16 }) {
  return (
    <Icon size={size}>
      <path d="M13 2L3 14h7l-1 8L21 10h-7l-1-8z" fill="currentColor" />
    </Icon>
  );
}
function Code({ size = 16 }) {
  return (
    <Icon size={size}>
      <path d="M16 18l6-6-6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 6L2 12l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  );
}
function Users({ size = 16 }) {
  return (
    <Icon size={size}>
      <path d="M16 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z" fill="currentColor" />
      <path d="M6 11c1.657 0 3-1.343 3-3S7.657 5 6 5 3 6.343 3 8s1.343 3 3 3z" fill="currentColor" />
      <path d="M2 20c0-2.5 3.582-4 8-4s8 1.5 8 4v1H2v-1z" fill="currentColor" />
    </Icon>
  );
}
function CheckCircle({ size = 16 }) {
  return (
    <Icon size={size}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  );
}
function Star({ size = 16 }) {
  return (
    <Icon size={size}>
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="currentColor" />
    </Icon>
  );
}

export default function DevLandingPage() {
  return (
    // <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900">
      // <div className="min-h-screen bg-gradient-to-b from-[#0a1a33] via-[#0f3d63] to-[#146b9e] text-white">
      <div className="fixed inset-0 w-full h-full overflow-auto bg-gradient-to-b from-[#0a1a33] via-[#0f3d63] to-[#146b9e] text-white z-50">

      {/* NAV */}
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* <div className="bg-emerald-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md">
            <BrandLogo size={18} />
          </div> */}
   
<div className="w-12 h-12 rounded-full overflow-hidden shadow-md">
  <img
    src={logo}
    alt="Profile Logo"
    className="w-full h-full object-cover"
  />
</div>

          <div>
             <span className="text-green-500 font-extrabold">Hook</span>
            <span className="text-white ">Craft</span>
            <div className="text-xs text-slate-500">Hooks for creators & Influencers</div>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
          <Link to="/features" className="hover:text-white">Features</Link>
          <Link to="/pricing" className="hover:text-white">Pricing</Link>
          <Link to="/customers" className="hover:text-white">Customers</Link>
          <Link to="/login" className="border px-4 py-2 rounded-md hover:text-white">Sign in</Link>
          <Link to="/signup" className="bg-emerald-600 text-white px-4 py-2 rounded-md">Get started</Link>
        </nav>
      </header>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-12 flex flex-col-reverse md:flex-row items-center gap-12">
        <div className="w-full md:w-1/2">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold leading-tight"
          >
            Create scroll-stopping <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-400">hooks</span> in seconds
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-600"
          >
            For Instagram Reels, YouTube Shorts & TikTok — AI-powered, tuned for creators and product teams. Ship more content ideas, faster.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35 }}
            className="mt-6 flex flex-wrap gap-3"
          >
            <Link to="/login" className="inline-flex items-center gap-2 bg-emerald-600 text-white px-5 py-3 rounded-lg shadow hover:scale-[1.02] transition-transform">
              <Zap size={16} />
              Generate Hooks
            </Link>

            <Link to="/signup" className="inline-flex items-center gap-2 border border-black bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-900">
              <Star size={16} />
              Get started — it's free
            </Link>

            <Link to="/sample" className="inline-flex items-center gap-2 text-sm text-slate-500 px-3 py-2 rounded-lg hover:text-black">
              <Code size={14} /> Preview templates
            </Link>
          </motion.div>

          <motion.div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-500">
            <div className="flex flex-col items-start">
              <span className="font-medium text-slate-100">10k+</span>
              <span>Hooks generated</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="font-medium text-slate-100">Trusted by</span>
              <span>Creator teams</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="font-medium text-slate-100">AVG +30%</span>
              <span>Engagement uplift</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="font-medium text-slate-100">Multi-platform</span>
              <span>Instagram · TikTok · YouTube</span>
            </div>
          </motion.div>
        </div>

        {/* Illustration / card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 flex justify-center"
        >
          <div className="w-full max-w-md bg-blue-900 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">AI Hook — Long-form to Short</h3>
                <p className="text-xs text-slate-800">Input your topic, tone, and platform. Instantly get 12 variations.</p>
              </div>
              <div className="text-slate-800 text-sm">Preview</div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="rounded-md border p-3 text-sm bg-blue-950">How to Stop Scrolling: "Hey, Congrats! Today I’ll tell you about a new earning source—but keep these four things in your mind."</div>
              <div className="rounded-md border p-3 text-sm bg-blue-950">"You won’t believe it, this will boost your watch time by 2x. So make sure to use HookCraft before you leave."</div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-xs text-slate-500">Template: Viral Hook · CTA</div>
              <div className="inline-flex items-center gap-2 text-xs">
                <CheckCircle size={16} />
                <span>Save to library</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <FeatureCard
            icon={<Zap size={20} />}
              title={
             <span className="text-black">
             Instant Ideas
            </span>
              }
            desc="Generate dozens of tested hook formulas tailored to your niche and tone."
          />

          <FeatureCard
            icon={<Code size={20} />}
             title={
             <span className="text-black">
             Developer Friendly
            </span>
              }
            desc="Export variations as CSV, JSON, or a simple copy-paste with metadata. Add to your content pipeline."
          />

          <FeatureCard
            icon={<Users size={20} />}
              title={
             <span className="text-black">
             Team Workflows
            </span>
              }
            desc="Share libraries, review drafts, and keep a changelog of top-performing hooks."
          />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="max-w-6xl mx-auto px-6 py-12">
        <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl font-semibold">Loved by creators & product teams</motion.h3>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <Testimonial quote="HookCraft cut our brainstorming time by half. The hooks convert." name="Arsalan Khan., Content Lead" />
          <Testimonial quote="A reliable way to Compare ideas quickly — shipped 3 shorts last week." name="Dev Team @HookCraft" />
          <Testimonial quote="The export tools let us integrate with our CMS in minutes." name="Arsalan Khan., Growth" />
        </div>
      </section>

     

      {/* FOOTER */}
      <footer className="max-w-6xl mx-auto px-6 py-10 text-sm text-slate-100">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="hover:text-slate-900">© {new Date().getFullYear()} HookCraft — Built for creators</div>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-slate-900">Privacy</Link>
            <Link to="/terms" className="hover:text-slate-900">Terms</Link>
            <Link to="/contact" className="hover:text-slate-900">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* Small reusable components inside the same file for convenience */
function FeatureCard({ icon, title, desc }) {
  return (
    <motion.div whileHover={{ y: -6 }} className="bg-white rounded-xl p-6 shadow-sm border">
      <div className="flex items-start gap-4">
        <div className="p-2 bg-emerald-50 rounded-md text-emerald-600">{icon}</div>
        <div>
          <h4 className="font-semibold">{title}</h4>
          <p className="text-sm text-slate-500 mt-1">{desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

function Testimonial({ quote, name }) {
  return (
    <motion.blockquote whileHover={{ scale: 1.02 }} className="bg-white p-6 rounded-xl shadow-sm border">
      <p className="text-slate-700 italic">“{quote}”</p>
      <div className="mt-4 text-xs text-slate-500">— {name}</div>
    </motion.blockquote>
  );
}
