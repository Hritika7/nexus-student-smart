import { useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/DashboardLayout';
import Chatbot from '@/components/Chatbot';
import { Heart, Smile, Frown, Meh, TrendingUp, MessageSquare, Send } from 'lucide-react';

const MOODS = [
  { value: 1, icon: '😢', label: 'Very Low' },
  { value: 2, icon: '😕', label: 'Low' },
  { value: 3, icon: '😐', label: 'Okay' },
  { value: 4, icon: '😊', label: 'Good' },
  { value: 5, icon: '😄', label: 'Great' },
];

const AI_SUGGESTIONS: Record<number, string[]> = {
  1: ['Take a 10-min walk outside 🌿', 'Talk to your mentor today', 'Join a campus wellness session'],
  2: ['Try the campus meditation app', 'Reach out to a friend', 'Take a short break from studies'],
  3: ['Keep up the good work! Try journaling', 'Attend a club activity today', 'Stay hydrated and rest well'],
  4: ['Great mood! Perfect time to tackle difficult tasks', 'Share positivity with peers', 'Explore a new hobby'],
  5: ['Amazing! Help a fellow student today', 'Document your wins in your journal', 'You\'re crushing it — keep going!'],
};

export default function WellbeingPage() {
  const [mood, setMood] = useState(3);
  const [stress, setStress] = useState(40);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [anonymous, setAnonymous] = useState(true);

  const stressColor = stress < 40 ? 'text-success' : stress < 70 ? 'text-warning' : 'text-destructive';

  const handleSubmit = () => {
    if (feedback.trim()) { setSubmitted(true); setFeedback(''); }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-20 max-w-3xl">
        <div>
          <h1 className="text-2xl font-display font-bold">Student Wellbeing Check-In</h1>
          <p className="text-muted-foreground mt-1">Your mental health matters. Check in weekly to get personalized support.</p>
        </div>

        {/* Mood selector */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-elevated rounded-2xl p-6">
          <h3 className="font-display font-bold text-lg mb-5">How are you feeling today?</h3>
          <div className="flex justify-between gap-2 mb-6">
            {MOODS.map(m => (
              <motion.button key={m.value} onClick={() => setMood(m.value)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${mood === m.value ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/30'}`}>
                <span className={`text-3xl transition-all ${mood === m.value ? 'scale-125' : ''}`}>{m.icon}</span>
                <span className="text-xs font-medium">{m.label}</span>
              </motion.button>
            ))}
          </div>

          {/* AI Suggestions */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
            <p className="text-sm font-semibold mb-2">🤖 AI Wellbeing Suggestions</p>
            <div className="space-y-1.5">
              {AI_SUGGESTIONS[mood].map((s, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  {s}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stress indicator */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card-elevated rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-lg">Stress Level Indicator</h3>
            <span className={`text-2xl font-display font-bold ${stressColor}`}>{stress}%</span>
          </div>
          <input type="range" min={0} max={100} value={stress} onChange={e => setStress(Number(e.target.value))}
            className="w-full h-2 rounded-full accent-primary cursor-pointer" />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>Relaxed</span>
            <span>Moderate</span>
            <span>High Stress</span>
          </div>
          {stress > 70 && (
            <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-xl text-sm text-destructive">
              ⚠️ High stress detected. We recommend speaking to the campus counselor or your mentor.
            </div>
          )}
        </motion.div>

        {/* Anonymous feedback */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card-elevated rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-lg">Anonymous Feedback</h3>
            <label className="flex items-center gap-2 cursor-pointer">
              <span className="text-sm text-muted-foreground">Anonymous</span>
              <div className={`w-10 h-5 rounded-full transition-all relative ${anonymous ? 'bg-primary' : 'bg-muted'}`} onClick={() => setAnonymous(!anonymous)}>
                <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all ${anonymous ? 'left-5' : 'left-0.5'}`} />
              </div>
            </label>
          </div>
          {submitted ? (
            <div className="text-center py-6">
              <span className="text-4xl">💚</span>
              <p className="font-semibold mt-3">Thank you for sharing!</p>
              <p className="text-muted-foreground text-sm">Your feedback helps us improve campus wellbeing.</p>
              <button onClick={() => setSubmitted(false)} className="mt-4 text-primary text-sm hover:underline">Submit another</button>
            </div>
          ) : (
            <>
              <textarea value={feedback} onChange={e => setFeedback(e.target.value)}
                placeholder="Share anything on your mind — academic pressure, hostel issues, anything..."
                rows={4}
                className="w-full bg-secondary rounded-xl p-3 text-sm outline-none focus:ring-2 ring-primary/30 transition-all resize-none" />
              <button onClick={handleSubmit} disabled={!feedback.trim()}
                className="mt-3 flex items-center gap-2 gradient-primary text-white px-5 py-2 rounded-xl text-sm font-medium hover:scale-105 transition-all disabled:opacity-50">
                <Send className="w-4 h-4" />
                Submit {anonymous ? 'Anonymously' : 'Feedback'}
              </button>
            </>
          )}
        </motion.div>
      </div>
      <Chatbot />
    </DashboardLayout>
  );
}
