import { useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/DashboardLayout';
import Chatbot from '@/components/Chatbot';
import { BookOpen, Search, Bookmark, BookMarked, Star, Filter } from 'lucide-react';

const BOOKS = [
  { id: 1, title: 'Introduction to Algorithms', author: 'Cormen et al.', branch: 'CSE', available: true, rating: 4.9, saved: false, cover: '📚' },
  { id: 2, title: 'The Pragmatic Programmer', author: 'Hunt & Thomas', branch: 'CSE', available: false, rating: 4.8, saved: true, cover: '💻' },
  { id: 3, title: 'Clean Code', author: 'Robert C. Martin', branch: 'CSE', available: true, rating: 4.7, saved: false, cover: '🧹' },
  { id: 4, title: 'Design Patterns', author: 'Gang of Four', branch: 'CSE', available: true, rating: 4.6, saved: false, cover: '🎨' },
  { id: 5, title: 'Computer Networks', author: 'Tanenbaum', branch: 'CSE', available: true, rating: 4.5, saved: true, cover: '🌐' },
  { id: 6, title: 'Operating Systems', author: 'Silberschatz', branch: 'CSE', available: false, rating: 4.4, saved: false, cover: '⚙️' },
  { id: 7, title: 'Database Systems', author: 'Korth & Sudarshan', branch: 'CSE', available: true, rating: 4.6, saved: false, cover: '🗄️' },
  { id: 8, title: 'Artificial Intelligence', author: 'Russell & Norvig', branch: 'CSE/AI', available: true, rating: 4.8, saved: true, cover: '🤖' },
];

export default function LibraryPage() {
  const [books, setBooks] = useState(BOOKS);
  const [search, setSearch] = useState('');

  const filtered = books.filter(b => b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase()));

  const toggleSave = (id: number) => setBooks(prev => prev.map(b => b.id === id ? { ...b, saved: !b.saved } : b));

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-20">
        <div>
          <h1 className="text-2xl font-display font-bold">Smart Library</h1>
          <p className="text-muted-foreground mt-1">AI-curated recommendations based on your branch and interests</p>
        </div>

        {/* AI Recommended */}
        <div className="card-elevated rounded-2xl p-5 bg-primary/5 border border-primary/20">
          <div className="flex items-center gap-2 mb-3">
            <Star className="w-5 h-5 text-primary" />
            <span className="font-semibold">Recommended for You — CS Branch</span>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
            {BOOKS.filter(b => b.rating >= 4.7).map(book => (
              <div key={book.id} className="flex-shrink-0 bg-card rounded-xl p-4 border border-border w-44">
                <div className="text-3xl mb-2">{book.cover}</div>
                <p className="font-semibold text-sm line-clamp-2 mb-1">{book.title}</p>
                <p className="text-xs text-muted-foreground">{book.author}</p>
                <div className="flex items-center gap-1 mt-2">
                  <Star className="w-3 h-3 fill-warning text-warning" />
                  <span className="text-xs font-medium">{book.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search books, authors..."
            className="w-full bg-card border border-border rounded-2xl py-3 pl-11 pr-4 outline-none focus:ring-2 ring-primary/30 transition-all" />
        </div>

        {/* Books grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((book, i) => (
            <motion.div key={book.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="card-elevated rounded-2xl p-5 hover:shadow-glow transition-all group">
              <div className="flex items-start justify-between mb-4">
                <span className="text-4xl">{book.cover}</span>
                <button onClick={() => toggleSave(book.id)} className={`p-1.5 rounded-lg transition-all ${book.saved ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-primary'}`}>
                  {book.saved ? <BookMarked className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                </button>
              </div>
              <h3 className="font-semibold text-sm mb-1 line-clamp-2">{book.title}</h3>
              <p className="text-xs text-muted-foreground mb-3">{book.author}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-warning text-warning" />
                  <span className="text-xs font-medium">{book.rating}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${book.available ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
                  {book.available ? 'Available' : 'Borrowed'}
                </span>
              </div>
              {book.available && (
                <button className="w-full mt-3 gradient-primary text-white text-xs py-2 rounded-xl hover:scale-105 transition-all">
                  Reserve Now
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      <Chatbot />
    </DashboardLayout>
  );
}
