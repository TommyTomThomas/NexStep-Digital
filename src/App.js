import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StarIcon, PhoneIcon, SparklesIcon } from "./icons";

const services = [
  { key: "branding", title: "Branding & Design", desc: "Identity systems across every touchpoint." },
  { key: "websites", title: "Website Builds", desc: "Conversion-focused sites that win business." },
  { key: "hosting", title: "Hosting & Support", desc: "Reliable hosting, updates, analytics, monitoring." },
  { key: "growth", title: "Growth Support", desc: "SEO tuning, uptime checks, fast help." },
];

const testimonials = [
  { key: "locksmith", quote: "Leads doubled in a month.", author: "M. Rivera, Locksmith" },
  { key: "contractor", quote: "Paid for itself in week one.", author: "S. Allen, Contractor" },
  { key: "boutique", quote: "Loads fast, CVR jumped.", author: "K. Nguyen, Boutique" },
];

const pricing = [{
  key: "full",
  title: "Complete Website Package",
  price: "$500 + $50/month",
  blurb: "Launch fast, stay fast—hosting, updates, and support included.",
  features: [
    "$500 custom build",
    "$50/mo hosting + updates + support",
    "Responsive, conversion-first design",
    "SEO setup & on-page basics",
    "Monthly content/photo updates",
    "Analytics, backups, performance checks",
  ],
}];

function ConstellationCanvas({ active }){
  const ref = useRef(null);
  const raf = useRef(null);
  const pts = useRef([]);
  const grad = useRef(null);
  useEffect(() => {
    const c = ref.current; const ctx = c.getContext("2d", { alpha:false });
    const makeGrad = () => { const g = ctx.createLinearGradient(0,0,c.width,c.height); g.addColorStop(0,"#e8ecf4"); g.addColorStop(1,"#f5f6fa"); grad.current = g; };
    const resize = () => { c.width = innerWidth; c.height = innerHeight; const n = Math.min(100, Math.floor((innerWidth*innerHeight)/18000)); pts.current = Array.from({length:n},()=>({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-0.5)*0.6,vy:(Math.random()-0.5)*0.6})); makeGrad(); };
    resize();
    const tick = () => { if(!active){ raf.current=requestAnimationFrame(tick); return; } ctx.fillStyle = grad.current; ctx.fillRect(0,0,c.width,c.height);
      const p=pts.current; for(let i=0;i<p.length;i++){ const a=p[i]; a.x+=a.vx; a.y+=a.vy; if(a.x<0||a.x>c.width) a.vx*=-1; if(a.y<0||a.y>c.height) a.vy*=-1; }
      for(let i=0;i<p.length;i++){ let links=0; for(let j=i+1;j<p.length;j++){ const a=p[i],b=p[j]; const d=Math.hypot(a.x-b.x,a.y-b.y); if(d<110){ const alpha=1-d/110; ctx.strokeStyle = `rgba(0,0,0,${alpha*0.35})`; ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke(); if(++links>4) break; } } }
      for(let i=0;i<p.length;i++){ const a=p[i]; ctx.fillStyle="#1e293b"; ctx.beginPath(); ctx.arc(a.x,a.y,1.6,0,Math.PI*2); ctx.fill(); }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick); addEventListener("resize", resize);
    return ()=>{ if(raf.current) cancelAnimationFrame(raf.current); removeEventListener("resize", resize); };
  },[active]);
  return <canvas ref={ref} className="absolute inset-0 h-full w-full"/>;
}

function IntroOverlay({ onFinish, show }){
  const [playing,setPlaying]=useState(true);
  const reduce = useMemo(()=> typeof window!=='undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches,[]);
  useEffect(()=>{ if(!show) return; const t=setTimeout(()=>{ setPlaying(false); onFinish(); }, reduce?1200:4200); return ()=>clearTimeout(t); },[show,onFinish,reduce]);
  return (
    <AnimatePresence>
      {show && (
        <motion.div className="fixed inset-0 z-[60] overflow-hidden bg-white" initial={{opacity:1}} exit={{opacity:0}} transition={{duration:0.8}}>
          <ConstellationCanvas active={playing && !reduce}/>
          <div className="relative z-10 grid h-full place-items-center px-6 text-center">
            <div>
              <motion.h1 initial={{letterSpacing:'0.75em',filter:'blur(8px)',opacity:0}} animate={{letterSpacing:'0.05em',filter:'blur(0px)',opacity:1}} transition={{duration:1.2}} className="font-extrabold tracking-tight text-5xl md:text-7xl text-gray-900">NexStep Digital</motion.h1>
              <motion.p initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.9,duration:0.6}} className="mt-5 text-gray-700 text-lg md:text-2xl max-w-2xl mx-auto">Design. Speed. Results. We turn attention into action.</motion.p>
            </div>
          </div>
          <motion.div initial={{scaleX:0}} animate={{scaleX:1}} transition={{delay:0.2,duration:1.0}} className="absolute top-0 left-0 h-1 w-full origin-left bg-gradient-to-r from-cyan-400 via-indigo-400 to-fuchsia-400"/>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Section({ id, title, eyebrow, children }){
  return (
    <section id={id} className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        {eyebrow && <div className="text-sm uppercase tracking-[0.2em] text-gray-500">{eyebrow}</div>}
        <h2 className="mt-2 text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900">{title}</h2>
        <div className="mt-8 text-gray-700 leading-relaxed">{children}</div>
      </div>
    </section>
  );
}

function Services(){
  return (
    <Section id="services" title="What We Do" eyebrow="Capabilities">
      <div className="grid md:grid-cols-2 gap-6">
        {services.map(s => (
          <motion.div key={s.key} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:0.3}} transition={{duration:0.5}} className="flex gap-4 rounded-2xl border border-gray-200 p-6 bg-white hover:bg-gray-50">
            <div className="mt-1 text-cyan-500"><StarIcon className="h-6 w-6"/></div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">{s.title}</h4>
              <p className="text-gray-700">{s.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function PricingSection(){
  const p = pricing[0];
  return (
    <Section id="pricing" title="Simple, Transparent Pricing" eyebrow="Plans">
      <div className="rounded-2xl border border-black shadow-lg bg-white p-6 relative">
        <span className="absolute -top-3 right-4 inline-flex items-center gap-1 rounded-full bg-black px-3 py-1 text-xs font-semibold text-white"><SparklesIcon className="h-3 w-3"/> Most Popular</span>
        <h3 className="text-2xl font-bold text-gray-900">{p.title}</h3>
        <div className="mt-2 text-4xl font-extrabold text-gray-900">{p.price}</div>
        <p className="mt-2 text-gray-700 text-lg">{p.blurb}</p>
        <ul className="mt-4 grid gap-2 text-gray-700">
          {p.features.map(f => (<li key={f} className="flex gap-2 items-start"><span className="text-cyan-500"><StarIcon className="h-5 w-5"/></span><span>{f}</span></li>))}
        </ul>
        <a href="#contact" className="mt-6 inline-block rounded-xl px-5 py-3 font-semibold bg-black text-white hover:bg-gray-800">Get Started</a>
      </div>
      <p className="mt-8 text-center text-gray-700 max-w-2xl mx-auto text-lg">One simple investment: a $500 build to get you live fast, plus $50/month to keep your site secure, optimized, and supported.</p>
    </Section>
  );
}

function Testimonials(){
  return (
    <Section id="testimonials" title="What clients say" eyebrow="Testimonials">
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map(t => (
          <motion.figure key={t.key} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:0.3}} transition={{duration:0.5}} className="rounded-2xl border border-gray-200 bg-white p-6">
            <blockquote className="text-gray-900 font-medium">“{t.quote}”</blockquote>
            <figcaption className="mt-3 text-sm text-gray-600">{t.author}</figcaption>
          </motion.figure>
        ))}
      </div>
    </Section>
  );
}

function Contact(){
  return (
    <Section id="contact" title="Let’s build something that sells" eyebrow="Get in touch">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="rounded-2xl border border-gray-200 p-6 bg-white">
          <h4 className="text-gray-900 font-semibold">Request a Quote</h4>
          <p className="text-gray-700">Use the form below and we’ll reply with a clear plan and pricing.</p>
          <div className="mt-4">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSe3xQvLehmBLRgiwzHgPMHf7ZYXXQkYfjTc9h7ZdEc7RPNRFg/viewform?embedded=true"
              className="w-full h-[900px] sm:h-[824px]"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
              title="NexStep Digital Contact Form"
            >
              Loading…
            </iframe>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-200 p-6 bg-white">
          <h4 className="text-gray-900 font-semibold">Why NexStep</h4>
          <ul className="mt-2 space-y-2 text-gray-700">
            <li className="flex gap-2"><span className="text-cyan-500"><StarIcon className="h-5 w-5"/></span> <span>Conversion‑first builds that look premium and load fast.</span></li>
            <li className="flex gap-2"><span className="text-cyan-500"><StarIcon className="h-5 w-5"/></span> <span>Clear communication. Milestones and metrics.</span></li>
            <li className="flex gap-2"><span className="text-cyan-500"><StarIcon className="h-5 w-5"/></span> <span>Local‑business friendly with enterprise polish.</span></li>
          </ul>
          <a href="#contact" className="mt-6 inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold bg-black text-white hover:bg-gray-800 w-max">
            <PhoneIcon className="h-4 w-4"/> Book a Call
          </a>
        </div>
      </div>
    </Section>
  );
}

export default function App(){
  const [showIntro,setShowIntro] = useState(true);
  return (
    <div className="min-h-screen text-gray-900 font-sans">
      <IntroOverlay show={showIntro} onFinish={()=>setShowIntro(false)}/>

      <header className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b border-gray-200">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/Favicon Original.ico"
              alt="NexStep Digital Logo"
              className="h-10 w-10 rounded-md object-contain transition-transform duration-200 hover:scale-105"
            />
            <span className="font-extrabold tracking-tight">NexStep Digital</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-700">
            <a href="#services" className="hover:text-black">Services</a>
            <a href="#pricing" className="hover:text-black">Pricing</a>
            <a href="#testimonials" className="hover:text-black">Testimonials</a>
            <a href="#contact" className="hover:text-black">Contact</a>
          </nav>
          <a href="#contact" className="text-sm rounded-xl bg-black text-white px-4 py-2 font-semibold hover:bg-gray-800">Get a Quote</a>
        </div>
      </header>

      <main>
        <section className="relative">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.08),transparent_50%),radial-gradient(ellipse_at_bottom,rgba(236,72,153,0.08),transparent_50%)]" />
          <div className="mx-auto max-w-6xl px-6 py-24 md:py-36">
            <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.8}} className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Websites that <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-400 to-fuchsia-400">win business</span>
            </motion.h1>
            <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.2,duration:0.8}} className="mt-6 text-lg md:text-xl text-gray-700 max-w-2xl">
              We craft conversion-focused sites, sharpen SEO, and run paid media that pays for itself.
            </motion.p>
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.35,duration:0.8}} className="mt-8 flex flex-wrap gap-3">
              <a href="#services" className="rounded-xl bg-black text-white px-5 py-3 font-semibold hover:bg-gray-800">See Work</a>
              <a href="#contact" className="rounded-xl border border-gray-300 px-5 py-3 text-gray-900 hover:bg-gray-100">Start a Project</a>
            </motion.div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-10">
          <div className="text-center text-sm uppercase tracking-[0.2em] text-gray-500">Trusted by local leaders</div>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
            {['Waynesville Auto','Pioneer Realty','Riverbend HVAC','Ozark Outfitters','GreenBranch'].map(n => (
              <div key={n} className="rounded-xl border border-gray-200 bg-white py-4 px-3 text-center text-gray-700">{n}</div>
            ))}
          </div>
        </section>

        <Services/>
        <PricingSection/>
        <Testimonials/>
        <Contact/>
      </main>

      <footer className="border-t border-gray-200">
        <div className="mx-auto max-w-6xl px-6 py-10 text-gray-600 text-sm flex items-center justify-between">
          <div>© {new Date().getFullYear()} NexStep Digital. All rights reserved.</div>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="rounded-xl border border-gray-300 px-3 py-1.5 hover:bg-gray-100">Back to top</button>
        </div>
      </footer>
    </div>
  );
}
