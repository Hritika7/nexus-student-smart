import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  GraduationCap, Brain, Shield, Users, BarChart3, BookOpen, Bell, Star,
  ArrowRight, ChevronRight, Moon, Sun, Play, Check, Zap, Award, Target, TrendingUp, MessageSquare
} from 'lucide-react';

const TYPEWRITER_WORDS = [
  'Smarter Onboarding',
  'AI Risk Detection',
  'Student Success',
  'Campus Intelligence',
];

function useTypewriter(words: string[], speed = 80, pause = 2000) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(current.slice(0, text.length + 1));
        if (text === current) {
          setTimeout(() => setIsDeleting(true), pause);
        }
      } else {
        setText(current.slice(0, text.length - 1));
        if (text === '') {
          setIsDeleting(false);
          setWordIndex(i => i + 1);
        }
      }
    }, isDeleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, speed, pause]);

  return text;
}

function CountUp({ target, suffix = '', duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      setCount(Math.floor(current));
      if (current >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const FEATURES = [
  { icon: Brain, title: 'AI Risk Engine', desc: 'Predict dropout risk before it happens with our ML-powered behavioral analysis.', color: 'from-blue-500 to-cyan-500' },
  { icon: Zap, title: 'Smart Onboarding', desc: 'Personalized task checklists that adapt to each student\'s unique journey.', color: 'from-violet-500 to-purple-600' },
  { icon: Award, title: 'Gamification', desc: 'XP points, achievement badges, and leaderboards to keep students engaged.', color: 'from-amber-500 to-orange-500' },
  { icon: Shield, title: 'Document Vault', desc: 'Blockchain-secured document verification with instant status updates.', color: 'from-emerald-500 to-teal-500' },
  { icon: MessageSquare, title: 'AI Chatbot', desc: 'Context-aware conversational assistant available 24/7 for student queries.', color: 'from-rose-500 to-pink-500' },
  { icon: BarChart3, title: 'Analytics Suite', desc: 'Real-time dashboards with branch-wise completion rates and engagement heatmaps.', color: 'from-indigo-500 to-blue-600' },
  { icon: Target, title: 'Career Module', desc: 'ATS-ready resume builder, skill tracker, and AI career roadmap generator.', color: 'from-cyan-500 to-sky-600' },
  { icon: TrendingUp, title: 'Mentor Match', desc: 'AI-powered mentor assignment based on learning style and academic performance.', color: 'from-fuchsia-500 to-violet-600' },
];

const TESTIMONIALS = [
  { name: 'Aarav Patel', role: 'Student, CSE 2024', text: 'CampusNXT made my first year so much smoother. The AI checklist told me exactly what to do and when!', rating: 5 },
  { name: 'Dr. Sunita Rao', role: 'HoD, Mechanical Dept.', text: 'The dropout risk engine helped us intervene early for 47 students this semester. Incredible tool.', rating: 5 },
  { name: 'Meena Krishnan', role: 'Parent, Chennai', text: 'I can track my son\'s progress, fees, and hostel status all in one place. Complete peace of mind.', rating: 5 },
];

const STATS = [
  { value: 50000, suffix: '+', label: 'Students Onboarded' },
  { value: 200, suffix: '+', label: 'Colleges Partner' },
  { value: 94, suffix: '%', label: 'Completion Rate' },
  { value: 12000, suffix: '+', label: 'Mentors Assigned' },
];

export default function Landing() {
  const [darkMode, setDarkMode] = useState(true);
  const typeText = useTypewriter(TYPEWRITER_WORDS);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 glass border-b border-border/50">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-display font-bold">CampusNXT</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {['Features', 'Analytics', 'Testimonials', 'Pricing'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-foreground transition-colors">{item}</a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-xl hover:bg-secondary transition-colors">
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <Link to="/login" className="hidden sm:flex items-center gap-2 gradient-primary text-white text-sm font-medium px-4 py-2 rounded-xl shadow-glow hover:shadow-glow transition-all">
            Sign In <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen gradient-hero relative flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/8 blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/8 blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
          {/* Grid */}
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(hsl(210 100% 60% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(210 100% 60% / 0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 glass-dark text-slate-300 text-sm px-4 py-1.5 rounded-full border border-white/10 mb-8">
              <Zap className="w-3.5 h-3.5 text-yellow-400" /> AI-Powered Platform for Engineering Colleges
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-bold text-white leading-tight mb-6"
          >
            Powering
            <br />
            <span className="typewriter" style={{ background: 'linear-gradient(135deg, hsl(210 100% 65%), hsl(173 80% 55%))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              {typeText}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            CampusNXT is the all-in-one student lifecycle intelligence platform — from day-one onboarding to placement success.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            {[
              { label: 'Login as Student', to: '/login', primary: true, icon: GraduationCap },
              { label: 'Login as Admin', to: '/login', primary: false, icon: Shield },
              { label: 'Login as Parent', to: '/login', primary: false, icon: Users },
            ].map(btn => {
              const Icon = btn.icon;
              return (
                <Link key={btn.label} to={btn.to}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${btn.primary
                    ? 'gradient-primary text-white shadow-glow hover:scale-105'
                    : 'glass-dark text-white border border-white/20 hover:border-white/40 hover:scale-105'}`}>
                  <Icon className="w-4 h-4" />{btn.label}
                </Link>
              );
            })}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {STATS.map(stat => (
              <div key={stat.label} className="glass-dark rounded-2xl p-4 border border-white/10">
                <div className="text-3xl font-display font-bold text-white">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-slate-400 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 text-xs animate-bounce">
          <span>Scroll to explore</span>
          <ChevronRight className="w-4 h-4 rotate-90" />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Platform Features</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mt-3 mb-4">Everything your campus needs</h2>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto">One platform. Every stakeholder. Complete intelligence.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="card-elevated rounded-2xl p-5 group hover:shadow-glow transition-all cursor-default"
                >
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${feat.color} flex items-center justify-center mb-4 shadow-md`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2">{feat.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feat.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Analytics Preview */}
      <section id="analytics" className="py-24 px-4 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-accent text-sm font-semibold uppercase tracking-wider">Real-time Intelligence</span>
              <h2 className="text-4xl font-display font-bold mt-3 mb-6">AI that understands your campus</h2>
              <div className="space-y-5">
                {[
                  { icon: Brain, title: 'Dropout Prediction', desc: '94% accuracy in identifying at-risk students 30 days before dropout signals appear.' },
                  { icon: BarChart3, title: 'Branch Analytics', desc: 'Compare onboarding completion rates across departments with real-time visualizations.' },
                  { icon: Bell, title: 'Smart Alerts', desc: 'Automated nudges sent at the right moment — not just reminders, but intelligent intervention.' },
                ].map(item => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{item.title}</h4>
                        <p className="text-muted-foreground text-sm">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Link to="/login" className="inline-flex items-center gap-2 mt-8 gradient-primary text-white font-semibold px-6 py-3 rounded-xl shadow-glow hover:scale-105 transition-all">
                View Live Demo <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Mock dashboard preview */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <div className="card-elevated rounded-3xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold">Onboarding Risk Heatmap</span>
                  <span className="text-accent text-xs font-medium bg-accent/10 px-2 py-1 rounded-full">Live</span>
                </div>
                <div className="grid grid-cols-7 gap-1.5">
                  {Array.from({ length: 35 }, (_, i) => {
                    const intensity = Math.random();
                    const color = intensity > 0.7 ? 'bg-destructive/70' : intensity > 0.4 ? 'bg-warning/60' : 'bg-success/50';
                    return <div key={i} className={`h-8 rounded ${color} opacity-${Math.floor(intensity * 10) * 10}`} style={{ opacity: 0.3 + intensity * 0.7 }} />;
                  })}
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-success/70 inline-block" /> Low Risk</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-warning/70 inline-block" /> Medium</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-destructive/70 inline-block" /> High Risk</span>
                </div>
                <div className="border-t border-border pt-4 grid grid-cols-3 gap-4">
                  {[{ label: 'Low Risk', val: '1,247', color: 'text-success' }, { label: 'Medium', val: '389', color: 'text-warning' }, { label: 'High Risk', val: '67', color: 'text-destructive' }].map(s => (
                    <div key={s.label} className="text-center">
                      <div className={`text-xl font-display font-bold ${s.color}`}>{s.val}</div>
                      <div className="text-muted-foreground text-xs">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-primary/10 blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Testimonials</span>
            <h2 className="text-4xl font-display font-bold mt-3">Loved by students, admins & parents</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-elevated rounded-2xl p-6 space-y-4"
              >
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="w-4 h-4 fill-warning text-warning" />)}
                </div>
                <p className="text-muted-foreground leading-relaxed">"{t.text}"</p>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-muted-foreground text-xs">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="gradient-hero rounded-3xl p-16 relative overflow-hidden">
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 30% 40%, hsl(210 100% 60% / 0.3), transparent 60%)' }} />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Ready to transform your campus?</h2>
              <p className="text-slate-300 text-xl mb-10">Join 200+ engineering colleges already using CampusNXT.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/login" className="gradient-primary text-white font-bold px-8 py-4 rounded-xl shadow-glow hover:scale-105 transition-all text-lg">
                  Get Started Free →
                </Link>
                <Link to="/login" className="glass-dark text-white font-semibold px-8 py-4 rounded-xl border border-white/20 hover:border-white/40 transition-all text-lg">
                  View Demo
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-foreground">CampusNXT</span>
          </div>
          <p>© 2025 CampusNXT. All rights reserved. Powered by AI.</p>
          <div className="flex items-center gap-6">
            {['Privacy', 'Terms', 'Contact'].map(item => (
              <a key={item} href="#" className="hover:text-foreground transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
