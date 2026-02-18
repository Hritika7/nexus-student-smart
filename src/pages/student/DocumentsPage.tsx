import { useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/DashboardLayout';
import Chatbot from '@/components/Chatbot';
import { FileText, Upload, CheckCircle, XCircle, Clock, Shield, Eye } from 'lucide-react';

const DOCUMENTS = [
  { id: 1, name: 'Aadhaar Card', status: 'approved', uploadedAt: 'Jan 15, 2025', type: 'ID Proof', note: '' },
  { id: 2, name: '10th Marksheet', status: 'approved', uploadedAt: 'Jan 15, 2025', type: 'Academic', note: '' },
  { id: 3, name: '12th Marksheet', status: 'approved', uploadedAt: 'Jan 16, 2025', type: 'Academic', note: '' },
  { id: 4, name: 'Bank Passbook', status: 'pending', uploadedAt: 'Not uploaded', type: 'Financial', note: '' },
  { id: 5, name: 'Transfer Certificate', status: 'rejected', uploadedAt: 'Jan 18, 2025', type: 'Academic', note: 'Document is not clearly visible. Please re-upload.' },
  { id: 6, name: 'Caste Certificate', status: 'pending', uploadedAt: 'Not uploaded', type: 'Category', note: '' },
  { id: 7, name: 'Passport Photo', status: 'approved', uploadedAt: 'Jan 14, 2025', type: 'Photo', note: '' },
  { id: 8, name: 'Income Certificate', status: 'pending', uploadedAt: 'Not uploaded', type: 'Financial', note: '' },
];

const statusConfig = {
  approved: { icon: CheckCircle, label: 'Approved', color: 'text-success', bg: 'bg-success/10 border-success/20' },
  pending: { icon: Clock, label: 'Pending', color: 'text-warning', bg: 'bg-warning/10 border-warning/20' },
  rejected: { icon: XCircle, label: 'Rejected', color: 'text-destructive', bg: 'bg-destructive/10 border-destructive/20' },
};

export default function DocumentsPage() {
  const [docs, setDocs] = useState(DOCUMENTS);
  const [filter, setFilter] = useState<'all' | 'approved' | 'pending' | 'rejected'>('all');

  const filtered = filter === 'all' ? docs : docs.filter(d => d.status === filter);
  const counts = { approved: docs.filter(d => d.status === 'approved').length, pending: docs.filter(d => d.status === 'pending').length, rejected: docs.filter(d => d.status === 'rejected').length };

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-20">
        <div>
          <h1 className="text-2xl font-display font-bold">Document Verification</h1>
          <p className="text-muted-foreground mt-1">Upload and track all your required documents</p>
        </div>

        {/* Blockchain badge */}
        <div className="flex items-center gap-3 bg-primary/5 border border-primary/20 rounded-2xl p-4">
          <Shield className="w-8 h-8 text-primary" />
          <div>
            <p className="font-semibold text-sm">Blockchain-Secured Verification</p>
            <p className="text-muted-foreground text-xs">All documents are encrypted and stored with immutable audit trails</p>
          </div>
          <span className="ml-auto text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">Hash: 0x4a8f...3b2c</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Approved', count: counts.approved, color: 'text-success', bg: 'bg-success/10' },
            { label: 'Pending', count: counts.pending, color: 'text-warning', bg: 'bg-warning/10' },
            { label: 'Rejected', count: counts.rejected, color: 'text-destructive', bg: 'bg-destructive/10' },
          ].map(s => (
            <div key={s.label} className={`card-elevated rounded-xl p-4 text-center`}>
              <div className={`text-3xl font-display font-bold ${s.color}`}>{s.count}</div>
              <p className="text-muted-foreground text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex gap-2 flex-wrap">
          {(['all', 'approved', 'pending', 'rejected'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === f ? 'gradient-primary text-white shadow-glow' : 'bg-secondary hover:bg-secondary/80'}`}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Documents grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((doc, i) => {
            const cfg = statusConfig[doc.status as keyof typeof statusConfig];
            const Icon = cfg.icon;
            return (
              <motion.div key={doc.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className={`card-elevated rounded-2xl p-5 border ${cfg.bg}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className={`flex items-center gap-1.5 text-xs font-medium ${cfg.color}`}>
                    <Icon className="w-3.5 h-3.5" />
                    {cfg.label}
                  </div>
                </div>
                <h3 className="font-semibold mb-1">{doc.name}</h3>
                <p className="text-muted-foreground text-xs mb-3">{doc.type} · {doc.uploadedAt}</p>
                {doc.note && <p className="text-xs text-destructive bg-destructive/10 rounded-lg p-2 mb-3">{doc.note}</p>}
                {doc.status !== 'approved' ? (
                  <button className="w-full flex items-center justify-center gap-2 border border-dashed border-primary/40 hover:border-primary text-primary text-sm py-2 rounded-xl transition-all">
                    <Upload className="w-4 h-4" /> {doc.status === 'rejected' ? 'Re-upload' : 'Upload'}
                  </button>
                ) : (
                  <button className="w-full flex items-center justify-center gap-2 bg-success/10 text-success text-sm py-2 rounded-xl">
                    <Eye className="w-4 h-4" /> View Document
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
      <Chatbot />
    </DashboardLayout>
  );
}
