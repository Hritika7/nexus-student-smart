import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff, GraduationCap, Mail, Lock, ArrowRight, Chrome, Github, Sparkles, User, Shield, Users, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DEMO_CREDS = [
  { role: 'Student', email: 'student@campusnxt.edu', password: 'student123', icon: GraduationCap, color: 'from-blue-500 to-cyan-500', desc: 'Arjun Sharma · CS 1st Year' },
  { role: 'Admin', email: 'admin@campusnxt.edu', password: 'admin123', icon: Shield, color: 'from-violet-500 to-purple-600', desc: 'Dr. Priya Mehta · Faculty' },
  { role: 'Parent', email: 'parent@campusnxt.edu', password: 'parent123', icon: Users, color: 'from-emerald-500 to-teal-500', desc: 'Rajesh Sharma · Parent' },
  { role: 'Mentor', email: 'mentor@campusnxt.edu', password: 'mentor123', icon: BookOpen, color: 'from-orange-500 to-amber-500', desc: 'Prof. Kavita Singh · Mentor' },
];

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const getRoleRedirect = (role: string) => {
    if (role === 'admin') return '/admin';
    if (role === 'parent') return '/parent';
    if (role === 'mentor') return '/student';
    return '/student';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      const savedUser = JSON.parse(localStorage.getItem('campusnxt_user') || '{}');
      toast({ title: `Welcome back, ${savedUser.name}! 👋`, description: 'Redirecting to your dashboard...' });
      navigate(getRoleRedirect(savedUser.role));
    } else {
      toast({ title: 'Login Failed', description: result.error, variant: 'destructive' });
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    const result = await loginWithGoogle();
    setGoogleLoading(false);
    if (result.success) {
      const savedUser = JSON.parse(localStorage.getItem('campusnxt_user') || '{}');
      toast({ title: `Welcome, ${savedUser.name}! 👋`, description: 'Logged in with Google' });
      navigate('/student');
    }
  };

  const fillDemo = (cred: typeof DEMO_CREDS[0]) => {
    setEmail(cred.email);
    setPassword(cred.password);
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/10 blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 relative z-10">
        {/* Left: Branding */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:flex flex-col justify-center space-y-8"
        >
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center shadow-glow">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-display font-bold text-white">CampusNXT</span>
          </Link>
          <div className="space-y-4">
            <h1 className="text-4xl font-display font-bold text-white leading-tight">
              Your Smart Campus,<br />
              <span className="gradient-text bg-gradient-to-r from-cyan-400 to-blue-400" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Reimagined.</span>
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed">
              AI-powered student lifecycle management for the modern engineering college.
            </p>
          </div>

          {/* Demo credentials */}
          <div className="space-y-3">
            <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Quick Login — Demo Accounts</p>
            <div className="grid grid-cols-2 gap-3">
              {DEMO_CREDS.map((cred) => {
                const Icon = cred.icon;
                return (
                  <motion.button
                    key={cred.role}
                    onClick={() => fillDemo(cred)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="glass-dark rounded-xl p-3 text-left hover:border-primary/40 transition-all group"
                  >
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${cred.color} flex items-center justify-center mb-2`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-white text-sm font-semibold">{cred.role}</p>
                    <p className="text-slate-400 text-xs">{cred.desc}</p>
                  </motion.button>
                );
              })}
            </div>
            <p className="text-slate-500 text-xs">Click any card to auto-fill credentials</p>
          </div>
        </motion.div>

        {/* Right: Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-dark rounded-3xl p-8 space-y-6"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-display font-bold text-white">CampusNXT</span>
          </div>

          <div>
            <h2 className="text-2xl font-display font-bold text-white">Sign in to your account</h2>
            <p className="text-slate-400 text-sm mt-1">Welcome back! Please enter your details.</p>
          </div>

          {/* Google */}
          <motion.button
            onClick={handleGoogle}
            disabled={googleLoading}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 rounded-xl py-3 text-white font-medium transition-all disabled:opacity-60"
          >
            {googleLoading ? (
              <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : (
              <Chrome className="w-5 h-5" />
            )}
            {googleLoading ? 'Signing in...' : 'Continue with Google'}
          </motion.button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-slate-500 text-xs">or sign in with email</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-slate-300 text-sm font-medium">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@campusnxt.edu"
                  required
                  className="w-full bg-white/5 border border-white/15 hover:border-white/25 focus:border-primary/60 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-slate-500 outline-none transition-all text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-slate-300 text-sm font-medium">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-white/5 border border-white/15 hover:border-white/25 focus:border-primary/60 rounded-xl py-3 pl-10 pr-11 text-white placeholder:text-slate-500 outline-none transition-all text-sm"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full gradient-primary text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 shadow-glow hover:shadow-glow transition-all disabled:opacity-60"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign In <ArrowRight className="w-4 h-4" /></>
              )}
            </motion.button>
          </form>

          {/* Mobile demo creds */}
          <div className="lg:hidden space-y-2">
            <p className="text-slate-500 text-xs text-center">Demo accounts — tap to fill</p>
            <div className="grid grid-cols-2 gap-2">
              {DEMO_CREDS.map(cred => {
                const Icon = cred.icon;
                return (
                  <button key={cred.role} onClick={() => fillDemo(cred)} className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-2 text-left transition-all">
                    <div className="flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5 text-slate-300" />
                      <span className="text-white text-xs font-medium">{cred.role}</span>
                    </div>
                    <p className="text-slate-500 text-xs mt-0.5 truncate">{cred.email}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-center gap-1 text-sm">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span className="text-slate-400">Powered by AI · </span>
            <Link to="/" className="text-primary hover:text-primary-glow transition-colors">Back to Home</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
