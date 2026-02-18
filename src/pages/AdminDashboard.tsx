import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Users, AlertTriangle, CheckCircle, FileText, TrendingUp, Shield, Bell, Activity } from 'lucide-react';

const branchData = [
  { branch: 'CSE', completion: 87 }, { branch: 'ECE', completion: 72 }, { branch: 'MECH', completion: 65 },
  { branch: 'CIVIL', completion: 78 }, { branch: 'EEE', completion: 80 }, { branch: 'IT', completion: 91 },
];

const trendData = [
  { week: 'W1', onboarded: 120, risk: 18 }, { week: 'W2', onboarded: 280, risk: 32 },
  { week: 'W3', onboarded: 520, risk: 45 }, { week: 'W4', onboarded: 890, risk: 38 },
  { week: 'W5', onboarded: 1240, risk: 28 }, { week: 'W6', onboarded: 1703, risk: 67 },
];

const riskDist = [
  { name: 'Low Risk', value: 1247, color: 'hsl(var(--success))' },
  { name: 'Medium', value: 389, color: 'hsl(var(--warning))' },
  { name: 'High Risk', value: 67, color: 'hsl(var(--destructive))' },
];

const AT_RISK_STUDENTS = [
  { name: 'Rahul Kumar', branch: 'MECH', score: 82, factors: 'No mentor meeting, 3 docs missing', roll: 'ME2024018' },
  { name: 'Priya Nair', branch: 'ECE', score: 76, factors: 'Fee overdue, low engagement', roll: 'EC2024033' },
  { name: 'Amit Singh', branch: 'CIVIL', score: 71, factors: 'Missing documents, no login in 7 days', roll: 'CV2024011' },
];

const PENDING_DOCS = [
  { student: 'Ananya Sharma', doc: 'Bank Passbook', branch: 'CSE', uploaded: 'Feb 18' },
  { student: 'Vikram Patel', doc: 'Transfer Certificate', branch: 'ECE', uploaded: 'Feb 17' },
  { student: 'Sneha Reddy', doc: 'Caste Certificate', branch: 'IT', uploaded: 'Feb 18' },
];

export default function AdminDashboard() {
  const { user } = useAuth();
  const cardVars = { hidden: { opacity: 0, y: 20 }, visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07 } }) };

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-10">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl md:text-3xl font-display font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back, {user?.name}. Here's your campus intelligence overview.</p>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Students', value: '1,703', icon: Users, color: 'text-primary', bg: 'bg-primary/10', change: '+12%' },
            { label: 'At-Risk Students', value: '67', icon: AlertTriangle, color: 'text-destructive', bg: 'bg-destructive/10', change: '+8%' },
            { label: 'Docs Pending', value: '234', icon: FileText, color: 'text-warning', bg: 'bg-warning/10', change: '-5%' },
            { label: 'Avg Completion', value: '79%', icon: TrendingUp, color: 'text-success', bg: 'bg-success/10', change: '+3%' },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div key={stat.label} custom={i} variants={cardVars} initial="hidden" animate="visible" className="card-elevated rounded-2xl p-5">
                <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
                <div className="flex items-end gap-2 mt-1">
                  <p className="text-2xl font-display font-bold">{stat.value}</p>
                  <span className={`text-xs mb-1 ${stat.change.startsWith('+') ? 'text-success' : 'text-destructive'}`}>{stat.change}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Charts row */}
        <div className="grid lg:grid-cols-2 gap-4">
          <motion.div custom={4} variants={cardVars} initial="hidden" animate="visible" className="card-elevated rounded-2xl p-6">
            <h3 className="font-display font-bold mb-4">Branch-wise Completion Rate (%)</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={branchData} barSize={32}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="branch" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px' }} />
                <Bar dataKey="completion" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div custom={5} variants={cardVars} initial="hidden" animate="visible" className="card-elevated rounded-2xl p-6">
            <h3 className="font-display font-bold mb-4">Onboarding Trend</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px' }} />
                <Line type="monotone" dataKey="onboarded" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ fill: 'hsl(var(--primary))' }} />
                <Line type="monotone" dataKey="risk" stroke="hsl(var(--destructive))" strokeWidth={2} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Risk dist + At-risk students */}
        <div className="grid lg:grid-cols-2 gap-4">
          <motion.div custom={6} variants={cardVars} initial="hidden" animate="visible" className="card-elevated rounded-2xl p-6">
            <h3 className="font-display font-bold mb-4">Risk Distribution</h3>
            <div className="flex items-center gap-6">
              <ResponsiveContainer width={140} height={140}>
                <PieChart>
                  <Pie data={riskDist} cx={65} cy={65} innerRadius={40} outerRadius={65} dataKey="value">
                    {riskDist.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-3 flex-1">
                {riskDist.map(r => (
                  <div key={r.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ background: r.color }} />
                      <span className="text-sm">{r.name}</span>
                    </div>
                    <span className="font-bold">{r.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div custom={7} variants={cardVars} initial="hidden" animate="visible" className="card-elevated rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold">High-Risk Students</h3>
              <span className="text-xs bg-destructive/10 text-destructive px-2 py-1 rounded-full font-medium">Needs Intervention</span>
            </div>
            <div className="space-y-3">
              {AT_RISK_STUDENTS.map(s => (
                <div key={s.roll} className="flex items-center gap-3 p-3 bg-destructive/5 border border-destructive/15 rounded-xl">
                  <div className="w-9 h-9 rounded-full bg-destructive/20 flex items-center justify-center text-destructive font-bold text-sm flex-shrink-0">
                    {s.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm">{s.name} <span className="text-muted-foreground font-normal">· {s.branch}</span></p>
                    <p className="text-xs text-muted-foreground truncate">{s.factors}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-destructive">{s.score}</p>
                    <button className="text-xs text-primary hover:underline">Notify</button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Pending doc approvals */}
        <motion.div custom={8} variants={cardVars} initial="hidden" animate="visible" className="card-elevated rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold">Pending Document Approvals</h3>
            <span className="text-xs bg-warning/10 text-warning px-2 py-1 rounded-full font-medium">234 Pending</span>
          </div>
          <div className="space-y-3">
            {PENDING_DOCS.map((doc, i) => (
              <div key={i} className="flex items-center gap-4 py-3 border-b border-border last:border-0">
                <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center font-bold text-sm flex-shrink-0">{doc.student.charAt(0)}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{doc.student}</p>
                  <p className="text-xs text-muted-foreground">{doc.doc} · {doc.branch} · Uploaded {doc.uploaded}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button className="text-xs bg-success/10 text-success border border-success/20 px-3 py-1.5 rounded-lg hover:bg-success/20 transition-all">Approve</button>
                  <button className="text-xs bg-destructive/10 text-destructive border border-destructive/20 px-3 py-1.5 rounded-lg hover:bg-destructive/20 transition-all">Reject</button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
