import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/DashboardLayout';
import { CheckCircle, CreditCard, Home, Bell, TrendingUp, AlertTriangle, Clock } from 'lucide-react';

const STUDENT_INFO = {
  name: 'Arjun Sharma',
  branch: 'Computer Science Engineering',
  year: '1st Year',
  roll: 'CS2024001',
  onboardingPct: 62,
  riskLevel: 'LOW',
  hostel: 'Block C, Room 214',
  mentor: 'Prof. Kavita Singh',
};

const ANNOUNCEMENTS = [
  { title: 'Semester Fee Installment 2 Due', date: 'Mar 15, 2025', type: 'warning' },
  { title: 'Annual Sports Day Registration Open', date: 'Feb 25, 2025', type: 'info' },
  { title: 'Mentor Meeting Scheduled', date: 'Feb 22, 2025', type: 'success' },
];

export default function ParentDashboard() {
  const cardVars = { hidden: { opacity: 0, y: 20 }, visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07 } }) };

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-10 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-display font-bold">Parent Dashboard</h1>
          <p className="text-muted-foreground mt-1">Monitoring {STUDENT_INFO.name}'s campus journey</p>
        </motion.div>

        {/* Student card */}
        <motion.div custom={0} variants={cardVars} initial="hidden" animate="visible" className="card-elevated rounded-2xl p-6 gradient-primary text-primary-foreground">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-2xl font-bold">A</div>
            <div>
              <h2 className="text-xl font-display font-bold">{STUDENT_INFO.name}</h2>
              <p className="text-primary-foreground/70">{STUDENT_INFO.branch} · {STUDENT_INFO.year}</p>
              <p className="text-primary-foreground/70 text-sm">Roll No: {STUDENT_INFO.roll}</p>
            </div>
            <div className="ml-auto text-right">
              <div className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">Risk: {STUDENT_INFO.riskLevel}</div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Onboarding', value: `${STUDENT_INFO.onboardingPct}%`, icon: TrendingUp, color: 'text-primary', bg: 'bg-primary/10' },
            { label: 'Fee Status', value: '₹45K Due', icon: CreditCard, color: 'text-warning', bg: 'bg-warning/10' },
            { label: 'Hostel', value: 'Allocated', icon: Home, color: 'text-success', bg: 'bg-success/10' },
            { label: 'Mentor', value: 'Assigned', icon: CheckCircle, color: 'text-accent', bg: 'bg-accent/10' },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.label} custom={i + 1} variants={cardVars} initial="hidden" animate="visible" className="card-elevated rounded-2xl p-4 text-center">
                <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mx-auto mb-2`}>
                  <Icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <p className="font-bold">{s.value}</p>
                <p className="text-muted-foreground text-xs">{s.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Hostel + Mentor */}
        <div className="grid sm:grid-cols-2 gap-4">
          <motion.div custom={5} variants={cardVars} initial="hidden" animate="visible" className="card-elevated rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3"><Home className="w-5 h-5 text-primary" /><h3 className="font-display font-bold">Hostel Allocation</h3></div>
            <p className="text-2xl font-bold">{STUDENT_INFO.hostel}</p>
            <p className="text-muted-foreground text-sm mt-1">Roommate: Vikram Nair (EEE)</p>
            <p className="text-success text-xs mt-2 bg-success/10 px-2 py-1 rounded-full inline-block">✓ Confirmed</p>
          </motion.div>
          <motion.div custom={6} variants={cardVars} initial="hidden" animate="visible" className="card-elevated rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3"><CheckCircle className="w-5 h-5 text-accent" /><h3 className="font-display font-bold">Assigned Mentor</h3></div>
            <p className="text-xl font-bold">{STUDENT_INFO.mentor}</p>
            <p className="text-muted-foreground text-sm mt-1">AI/ML Specialist · 8 years experience</p>
            <p className="text-accent text-xs mt-2 bg-accent/10 px-2 py-1 rounded-full inline-block">Active Mentor</p>
          </motion.div>
        </div>

        {/* Announcements */}
        <motion.div custom={7} variants={cardVars} initial="hidden" animate="visible" className="card-elevated rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4"><Bell className="w-5 h-5 text-primary" /><h3 className="font-display font-bold">Important Announcements</h3></div>
          <div className="space-y-3">
            {ANNOUNCEMENTS.map((a, i) => (
              <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border ${a.type === 'warning' ? 'bg-warning/5 border-warning/20' : a.type === 'success' ? 'bg-success/5 border-success/20' : 'bg-primary/5 border-primary/20'}`}>
                {a.type === 'warning' ? <AlertTriangle className="w-4 h-4 text-warning flex-shrink-0" /> : <Bell className="w-4 h-4 text-primary flex-shrink-0" />}
                <div className="flex-1"><p className="text-sm font-medium">{a.title}</p><p className="text-xs text-muted-foreground">{a.date}</p></div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
