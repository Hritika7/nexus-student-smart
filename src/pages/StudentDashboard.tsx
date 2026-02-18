import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/DashboardLayout';
import Chatbot from '@/components/Chatbot';
import { useAuth } from '@/contexts/AuthContext';
import {
  CheckSquare, AlertTriangle, Trophy, Clock, FileText, CreditCard,
  Users, BookOpen, Heart, Briefcase, ArrowRight, TrendingUp, Star,
  Zap, Shield, Bell, ChevronRight, Award, Target, Activity
} from 'lucide-react';
import { RadialBarChart, RadialBar, ResponsiveContainer, Tooltip } from 'recharts';
import { Link } from 'react-router-dom';

const TASKS = [
  { id: 1, label: 'Submit Aadhaar Card', done: true, xp: 50, category: 'Documents' },
  { id: 2, label: 'Pay Semester Fee', done: true, xp: 100, category: 'Fees' },
  { id: 3, label: 'Library Card Activation', done: false, xp: 30, category: 'Library' },
  { id: 4, label: 'Hostel Room Allotment Form', done: true, xp: 40, category: 'Hostel' },
  { id: 5, label: 'Mentor Meeting - Week 1', done: false, xp: 60, category: 'Mentor' },
  { id: 6, label: 'Upload Bank Passbook', done: false, xp: 50, category: 'Documents' },
  { id: 7, label: 'Health Check-up Registration', done: true, xp: 30, category: 'Wellbeing' },
  { id: 8, label: 'Elective Course Selection', done: false, xp: 70, category: 'Academic' },
];

const RISK_FACTORS = [
  { label: 'Document Completion', value: 67, weight: 'Medium', color: 'text-warning' },
  { label: 'Fee Payment Status', value: 85, weight: 'Low', color: 'text-success' },
  { label: 'Mentor Interaction', value: 30, weight: 'High', color: 'text-destructive' },
  { label: 'Academic Readiness', value: 72, weight: 'Medium', color: 'text-warning' },
];

const BADGES = [
  { name: 'Early Bird', icon: '🌅', earned: true, desc: 'Logged in within first 24hrs' },
  { name: 'Doc Master', icon: '📄', earned: true, desc: 'Submitted 3+ documents' },
  { name: 'Fee Champion', icon: '💳', earned: true, desc: 'Paid fees on time' },
  { name: 'Mentor Meet', icon: '🤝', earned: false, desc: 'Complete mentor meeting' },
  { name: 'Tech Titan', icon: '⚡', earned: false, desc: 'Reach Level 3' },
  { name: 'Scholar', icon: '🎓', earned: false, desc: '100% onboarding complete' },
];

const DEADLINES = [
  { title: 'Bank Passbook Upload', date: 'Feb 22, 2025', daysLeft: 4, urgent: true },
  { title: 'Library Card Activation', date: 'Feb 28, 2025', daysLeft: 10, urgent: false },
  { title: 'Semester Fee (Installment 2)', date: 'Mar 15, 2025', daysLeft: 25, urgent: false },
  { title: 'Mentor Meeting Confirmation', date: 'Feb 25, 2025', daysLeft: 7, urgent: true },
];

function CircularProgress({ value, size = 120, strokeWidth = 10 }: { value: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="hsl(var(--muted))" strokeWidth={strokeWidth} />
      <motion.circle
        cx={size / 2} cy={size / 2} r={radius} fill="none"
        stroke="hsl(var(--primary))" strokeWidth={strokeWidth} strokeLinecap="round"
        strokeDasharray={circumference} strokeDashoffset={circumference}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />
    </svg>
  );
}

export default function StudentDashboard() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState(TASKS);
  const completedTasks = tasks.filter(t => t.done).length;
  const completionPct = Math.round((completedTasks / tasks.length) * 100);
  const totalXP = tasks.filter(t => t.done).reduce((s, t) => s + t.xp, 0);
  const level = totalXP >= 300 ? 'Campus Pro' : totalXP >= 150 ? 'Fresher+' : 'Fresher';
  const riskScore = 32;
  const riskColor = riskScore < 40 ? 'text-success' : riskScore < 70 ? 'text-warning' : 'text-destructive';
  const riskBg = riskScore < 40 ? 'bg-success/10 border-success/20' : riskScore < 70 ? 'bg-warning/10 border-warning/20' : 'bg-destructive/10 border-destructive/20';

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.5 } }),
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-20">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold">Good morning, {user?.name?.split(' ')[0]}! 👋</h1>
            <p className="text-muted-foreground mt-1">Here's your onboarding progress. You're doing great!</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-secondary px-3 py-2 rounded-xl">
              <Zap className="w-4 h-4 text-warning" />
              <span className="font-bold text-sm">{totalXP} XP</span>
            </div>
            <div className="flex items-center gap-2 bg-secondary px-3 py-2 rounded-xl">
              <Star className="w-4 h-4 text-primary" />
              <span className="font-bold text-sm">{level}</span>
            </div>
          </div>
        </motion.div>

        {/* Top row: Progress + Risk + Quick stats */}
        <div className="grid md:grid-cols-3 gap-4">
          {/* Onboarding Progress */}
          <motion.div custom={0} variants={cardVariants} initial="hidden" animate="visible" className="card-elevated rounded-2xl p-6 flex flex-col items-center text-center">
            <div className="relative mb-4">
              <CircularProgress value={completionPct} size={120} strokeWidth={10} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-display font-bold">{completionPct}%</span>
                <span className="text-xs text-muted-foreground">Complete</span>
              </div>
            </div>
            <h3 className="font-display font-bold mb-1">Onboarding Progress</h3>
            <p className="text-muted-foreground text-sm">{completedTasks}/{tasks.length} tasks done</p>
            <div className="mt-3 text-xs text-primary font-medium bg-primary/10 px-3 py-1 rounded-full">
              ✨ Next: Library Card Activation
            </div>
          </motion.div>

          {/* Risk Score */}
          <motion.div custom={1} variants={cardVariants} initial="hidden" animate="visible" className={`card-elevated rounded-2xl p-6 border ${riskBg}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold">AI Risk Score</h3>
              <Shield className={`w-5 h-5 ${riskColor}`} />
            </div>
            <div className={`text-5xl font-display font-bold mb-2 ${riskColor}`}>{riskScore}</div>
            <div className={`text-sm font-semibold mb-4 ${riskColor}`}>LOW RISK ✓</div>
            <div className="space-y-2">
              {RISK_FACTORS.map(factor => (
                <div key={factor.label} className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground truncate">{factor.label}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${factor.value}%` }} />
                    </div>
                    <span className={`font-medium w-12 text-right ${factor.color}`}>{factor.weight}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div custom={2} variants={cardVariants} initial="hidden" animate="visible" className="space-y-3">
            {[
              { label: 'XP Points', value: totalXP, icon: Zap, color: 'text-warning', bg: 'bg-warning/10' },
              { label: 'Level', value: level, icon: Trophy, color: 'text-primary', bg: 'bg-primary/10' },
              { label: 'Badges Earned', value: `${BADGES.filter(b => b.earned).length}/6`, icon: Award, color: 'text-accent', bg: 'bg-accent/10' },
              { label: 'Days to Deadline', value: '4 days', icon: Clock, color: 'text-destructive', bg: 'bg-destructive/10' },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="card-elevated rounded-xl px-4 py-3 flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg ${stat.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-muted-foreground text-xs">{stat.label}</p>
                    <p className="font-bold text-sm truncate">{stat.value}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Onboarding Checklist */}
        <motion.div custom={3} variants={cardVariants} initial="hidden" animate="visible" className="card-elevated rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-primary" />
              <h3 className="font-display font-bold text-lg">Onboarding Checklist</h3>
            </div>
            <span className="text-sm text-muted-foreground">{completedTasks} of {tasks.length} done</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-2.5">
            {tasks.map(task => (
              <motion.button
                key={task.id}
                onClick={() => toggleTask(task.id)}
                whileHover={{ x: 2 }}
                className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${task.done
                  ? 'bg-success/5 border-success/20'
                  : 'bg-secondary/50 border-border hover:border-primary/30'}`}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${task.done ? 'bg-success border-success' : 'border-border'}`}>
                  {task.done && <span className="text-white text-xs">✓</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${task.done ? 'line-through text-muted-foreground' : ''}`}>{task.label}</p>
                  <p className="text-xs text-muted-foreground">{task.category}</p>
                </div>
                <span className="text-xs font-bold text-primary flex-shrink-0">+{task.xp} XP</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Badges + Deadlines */}
        <div className="grid lg:grid-cols-2 gap-4">
          {/* Gamification Badges */}
          <motion.div custom={4} variants={cardVariants} initial="hidden" animate="visible" className="card-elevated rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <Trophy className="w-5 h-5 text-warning" />
              <h3 className="font-display font-bold text-lg">Achievement Badges</h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {BADGES.map(badge => (
                <motion.div
                  key={badge.name}
                  whileHover={{ scale: 1.05 }}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border text-center transition-all ${badge.earned ? 'bg-primary/5 border-primary/20' : 'bg-muted/30 border-border opacity-50'}`}
                >
                  <span className={`text-2xl ${badge.earned ? '' : 'grayscale'}`}>{badge.icon}</span>
                  <p className="text-xs font-semibold leading-tight">{badge.name}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-primary/5 rounded-xl border border-primary/20">
              <p className="text-xs text-muted-foreground">🎯 Next badge: <strong className="text-primary">Mentor Meet</strong> — Schedule your first mentor session</p>
            </div>
          </motion.div>

          {/* Deadlines */}
          <motion.div custom={5} variants={cardVariants} initial="hidden" animate="visible" className="card-elevated rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <Bell className="w-5 h-5 text-destructive" />
              <h3 className="font-display font-bold text-lg">Smart Deadlines</h3>
            </div>
            <div className="space-y-3">
              {DEADLINES.map(dl => (
                <div key={dl.title} className={`flex items-center gap-3 p-3 rounded-xl border ${dl.urgent ? 'bg-destructive/5 border-destructive/20' : 'bg-secondary/50 border-border'}`}>
                  <div className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center flex-shrink-0 ${dl.urgent ? 'bg-destructive text-destructive-foreground' : 'bg-secondary text-foreground'}`}>
                    <span className="text-xs font-bold">{dl.daysLeft}d</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{dl.title}</p>
                    <p className="text-xs text-muted-foreground">{dl.date}</p>
                  </div>
                  {dl.urgent && <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0" />}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Module quick links */}
        <motion.div custom={6} variants={cardVariants} initial="hidden" animate="visible" className="card-elevated rounded-2xl p-6">
          <h3 className="font-display font-bold text-lg mb-5">Quick Access</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: FileText, label: 'Documents', path: '/student/documents', color: 'from-blue-500 to-cyan-500', status: '2 Pending' },
              { icon: CreditCard, label: 'Fee Portal', path: '/student/fees', color: 'from-emerald-500 to-teal-500', status: '₹45K Due' },
              { icon: Users, label: 'My Mentor', path: '/student/mentor', color: 'from-violet-500 to-purple-600', status: 'Prof. Kavita' },
              { icon: BookOpen, label: 'Library', path: '/student/library', color: 'from-amber-500 to-orange-500', status: '3 Saved' },
              { icon: Heart, label: 'Wellbeing', path: '/student/wellbeing', color: 'from-rose-500 to-pink-500', status: 'Check In' },
              { icon: Briefcase, label: 'Career', path: '/student/career', color: 'from-indigo-500 to-blue-600', status: 'ATS: 72%' },
              { icon: Target, label: 'Onboarding', path: '/student/onboarding', color: 'from-cyan-500 to-sky-600', status: `${completionPct}%` },
              { icon: Activity, label: 'Risk Score', path: '/student', color: 'from-fuchsia-500 to-violet-600', status: 'Score: 32' },
            ].map(item => {
              const Icon = item.icon;
              return (
                <Link key={item.path} to={item.path}>
                  <motion.div whileHover={{ y: -2 }} className="card-elevated rounded-xl p-4 flex flex-col items-center gap-2 text-center hover:shadow-glow transition-all cursor-pointer group">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-sm`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-sm font-semibold">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.status}</p>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </motion.div>
      </div>
      <Chatbot />
    </DashboardLayout>
  );
}
