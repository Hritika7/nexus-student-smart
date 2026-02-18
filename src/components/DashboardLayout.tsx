import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import {
  GraduationCap, LayoutDashboard, CheckSquare, FileText, CreditCard,
  Users, BookOpen, Heart, Briefcase, Bell, LogOut, ChevronLeft,
  ChevronRight, Settings, User, BarChart3, Shield, Home, Menu, X
} from 'lucide-react';

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
  badge?: string;
}

const STUDENT_NAV: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/student' },
  { icon: CheckSquare, label: 'Onboarding', path: '/student/onboarding' },
  { icon: FileText, label: 'Documents', path: '/student/documents' },
  { icon: CreditCard, label: 'Fee Portal', path: '/student/fees' },
  { icon: Users, label: 'Mentor', path: '/student/mentor' },
  { icon: BookOpen, label: 'Library', path: '/student/library' },
  { icon: Heart, label: 'Wellbeing', path: '/student/wellbeing' },
  { icon: Briefcase, label: 'Career', path: '/student/career' },
  { icon: Bell, label: 'Reminders', path: '/student/reminders', badge: '3' },
];

const ADMIN_NAV: NavItem[] = [
  { icon: LayoutDashboard, label: 'Overview', path: '/admin' },
  { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
  { icon: Shield, label: 'Risk Monitor', path: '/admin/risk' },
  { icon: FileText, label: 'Documents', path: '/admin/documents' },
  { icon: CreditCard, label: 'Fee Monitor', path: '/admin/fees' },
  { icon: Users, label: 'Mentor Panel', path: '/admin/mentors' },
  { icon: Bell, label: 'Alerts', path: '/admin/alerts', badge: '12' },
  { icon: GraduationCap, label: 'Activity Logs', path: '/admin/logs' },
];

const PARENT_NAV: NavItem[] = [
  { icon: Home, label: 'Overview', path: '/parent' },
  { icon: CheckSquare, label: 'Progress', path: '/parent/progress' },
  { icon: CreditCard, label: 'Fees', path: '/parent/fees' },
  { icon: Bell, label: 'Alerts', path: '/parent/alerts' },
];

const roleNavMap: Record<string, NavItem[]> = {
  student: STUDENT_NAV,
  admin: ADMIN_NAV,
  parent: PARENT_NAV,
  mentor: STUDENT_NAV,
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = user ? roleNavMap[user.role] || STUDENT_NAV : STUDENT_NAV;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`flex items-center gap-2.5 p-4 border-b border-sidebar-border ${collapsed ? 'justify-center' : ''}`}>
        <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-glow flex-shrink-0">
          <GraduationCap className="w-5 h-5 text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }} exit={{ opacity: 0, width: 0 }} className="font-display font-bold text-lg overflow-hidden whitespace-nowrap">
              CampusNXT
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* User info */}
      <div className={`p-4 border-b border-sidebar-border ${collapsed ? 'items-center' : ''} flex gap-3`}>
        <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
          {user?.name?.charAt(0) || 'U'}
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="overflow-hidden">
              <p className="font-semibold text-sm truncate text-sidebar-foreground">{user?.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto scrollbar-hide">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative ${isActive
                ? 'bg-primary text-primary-foreground shadow-glow'
                : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'}`}>
              <Icon className="w-5 h-5 flex-shrink-0" />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm font-medium truncate flex-1">
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {item.badge && !collapsed && (
                <span className="bg-destructive text-destructive-foreground text-xs px-1.5 py-0.5 rounded-full font-medium">{item.badge}</span>
              )}
              {item.badge && collapsed && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-sidebar-border space-y-1">
        <Link to="/" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all`}>
          <Home className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm">Home</span>}
        </Link>
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all">
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm">Sign Out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-background">
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 240 }}
        transition={{ duration: 0.3 }}
        className="hidden md:flex flex-col bg-sidebar border-r border-sidebar-border relative flex-shrink-0"
      >
        <SidebarContent />
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3.5 top-20 w-7 h-7 rounded-full bg-card border border-border shadow-sm flex items-center justify-center hover:bg-secondary transition-colors z-10"
        >
          {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>
      </motion.aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileOpen(false)} className="fixed inset-0 bg-black/50 z-40 md:hidden" />
            <motion.aside
              initial={{ x: -240 }} animate={{ x: 0 }} exit={{ x: -240 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed left-0 top-0 bottom-0 w-60 bg-sidebar border-r border-sidebar-border z-50 md:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-border bg-card">
          <button onClick={() => setMobileOpen(true)} className="p-2 rounded-xl hover:bg-secondary transition-colors">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold">CampusNXT</span>
          </div>
          <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-sm">
            {user?.name?.charAt(0) || 'U'}
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
