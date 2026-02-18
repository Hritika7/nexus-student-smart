import { useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/DashboardLayout';
import Chatbot from '@/components/Chatbot';
import { CreditCard, CheckCircle, Clock, AlertTriangle, Download, ChevronDown, ChevronUp, GraduationCap } from 'lucide-react';

const INSTALLMENTS = [
  { id: 1, label: 'Semester 1 - Installment 1', amount: 40000, due: 'Jan 10, 2025', paid: true, date: 'Jan 8, 2025', receipt: 'RCP-2025-001' },
  { id: 2, label: 'Semester 1 - Installment 2', amount: 45000, due: 'Mar 15, 2025', paid: false, date: null, receipt: null },
  { id: 3, label: 'Hostel Fees', amount: 25000, due: 'Jan 10, 2025', paid: true, date: 'Jan 9, 2025', receipt: 'RCP-2025-002' },
  { id: 4, label: 'Library & Lab Fees', amount: 5000, due: 'Jan 10, 2025', paid: true, date: 'Jan 8, 2025', receipt: 'RCP-2025-003' },
];

const HISTORY = [
  { date: 'Jan 8, 2025', desc: 'Semester 1 - Inst. 1', amount: 40000, mode: 'UPI', status: 'Success' },
  { date: 'Jan 8, 2025', desc: 'Library & Lab Fees', amount: 5000, mode: 'UPI', status: 'Success' },
  { date: 'Jan 9, 2025', desc: 'Hostel Fees', amount: 25000, mode: 'Net Banking', status: 'Success' },
];

export default function FeesPage() {
  const [paying, setPaying] = useState<number | null>(null);
  const totalPaid = INSTALLMENTS.filter(i => i.paid).reduce((s, i) => s + i.amount, 0);
  const totalDue = INSTALLMENTS.filter(i => !i.paid).reduce((s, i) => s + i.amount, 0);
  const total = INSTALLMENTS.reduce((s, i) => s + i.amount, 0);

  const handlePay = async (id: number) => {
    setPaying(id);
    await new Promise(r => setTimeout(r, 2000));
    setPaying(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-20">
        <div>
          <h1 className="text-2xl font-display font-bold">Fee Payment Portal</h1>
          <p className="text-muted-foreground mt-1">Track installments, view history, and make secure payments</p>
        </div>

        {/* Summary cards */}
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: 'Total Fees', value: `₹${total.toLocaleString()}`, color: 'text-foreground', icon: GraduationCap, bg: 'bg-secondary' },
            { label: 'Amount Paid', value: `₹${totalPaid.toLocaleString()}`, color: 'text-success', icon: CheckCircle, bg: 'bg-success/10' },
            { label: 'Pending Dues', value: `₹${totalDue.toLocaleString()}`, color: 'text-destructive', icon: AlertTriangle, bg: 'bg-destructive/10' },
          ].map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="card-elevated rounded-2xl p-5">
                <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
                  <Icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <p className="text-muted-foreground text-sm">{s.label}</p>
                <p className={`text-2xl font-display font-bold mt-1 ${s.color}`}>{s.value}</p>
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="card-elevated rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold">Fee Payment Progress</span>
            <span className="text-sm text-muted-foreground">{Math.round((totalPaid / total) * 100)}% paid</span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${(totalPaid / total) * 100}%` }} transition={{ duration: 1.5, ease: 'easeOut' }}
              className="h-full gradient-primary rounded-full" />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>₹{totalPaid.toLocaleString()} paid</span>
            <span>₹{totalDue.toLocaleString()} remaining</span>
          </div>
        </div>

        {/* Scholarship */}
        <div className="bg-accent/10 border border-accent/20 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-accent" />
          </div>
          <div className="flex-1">
            <p className="font-semibold">Merit Scholarship Applied</p>
            <p className="text-muted-foreground text-sm">₹15,000 deducted from Semester 1 fees</p>
          </div>
          <span className="text-accent font-bold">-₹15,000</span>
        </div>

        {/* Installments */}
        <div className="card-elevated rounded-2xl p-6">
          <h3 className="font-display font-bold text-lg mb-4">Installment Schedule</h3>
          <div className="space-y-3">
            {INSTALLMENTS.map(inst => (
              <div key={inst.id} className={`flex items-center gap-4 p-4 rounded-xl border ${inst.paid ? 'bg-success/5 border-success/20' : 'bg-destructive/5 border-destructive/20'}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${inst.paid ? 'bg-success/20' : 'bg-destructive/20'}`}>
                  {inst.paid ? <CheckCircle className="w-5 h-5 text-success" /> : <Clock className="w-5 h-5 text-destructive" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{inst.label}</p>
                  <p className="text-muted-foreground text-xs">{inst.paid ? `Paid on ${inst.date}` : `Due: ${inst.due}`}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-bold">₹{inst.amount.toLocaleString()}</p>
                  {inst.paid ? (
                    <button className="text-xs text-primary flex items-center gap-1 mt-1"><Download className="w-3 h-3" />Receipt</button>
                  ) : (
                    <button onClick={() => handlePay(inst.id)} disabled={paying === inst.id}
                      className="text-xs gradient-primary text-white px-3 py-1 rounded-lg mt-1 hover:scale-105 transition-all disabled:opacity-60">
                      {paying === inst.id ? 'Processing...' : 'Pay Now'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment History */}
        <div className="card-elevated rounded-2xl p-6">
          <h3 className="font-display font-bold text-lg mb-4">Payment History</h3>
          <div className="space-y-2">
            {HISTORY.map((h, i) => (
              <div key={i} className="flex items-center gap-4 py-3 border-b border-border last:border-0">
                <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-success" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{h.desc}</p>
                  <p className="text-xs text-muted-foreground">{h.date} · {h.mode}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-success">₹{h.amount.toLocaleString()}</p>
                  <p className="text-xs text-success">{h.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Chatbot />
    </DashboardLayout>
  );
}
