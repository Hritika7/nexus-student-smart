import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ParentDashboard from "./pages/ParentDashboard";
import DocumentsPage from "./pages/student/DocumentsPage";
import FeesPage from "./pages/student/FeesPage";
import LibraryPage from "./pages/student/LibraryPage";
import WellbeingPage from "./pages/student/WellbeingPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />

            {/* Student routes */}
            <Route path="/student" element={<ProtectedRoute allowedRoles={["student", "mentor"]}><StudentDashboard /></ProtectedRoute>} />
            <Route path="/student/documents" element={<ProtectedRoute allowedRoles={["student", "mentor"]}><DocumentsPage /></ProtectedRoute>} />
            <Route path="/student/fees" element={<ProtectedRoute allowedRoles={["student", "mentor"]}><FeesPage /></ProtectedRoute>} />
            <Route path="/student/library" element={<ProtectedRoute allowedRoles={["student", "mentor"]}><LibraryPage /></ProtectedRoute>} />
            <Route path="/student/wellbeing" element={<ProtectedRoute allowedRoles={["student", "mentor"]}><WellbeingPage /></ProtectedRoute>} />
            <Route path="/student/onboarding" element={<ProtectedRoute allowedRoles={["student", "mentor"]}><StudentDashboard /></ProtectedRoute>} />
            <Route path="/student/mentor" element={<ProtectedRoute allowedRoles={["student", "mentor"]}><StudentDashboard /></ProtectedRoute>} />
            <Route path="/student/career" element={<ProtectedRoute allowedRoles={["student", "mentor"]}><StudentDashboard /></ProtectedRoute>} />
            <Route path="/student/reminders" element={<ProtectedRoute allowedRoles={["student", "mentor"]}><StudentDashboard /></ProtectedRoute>} />

            {/* Admin routes */}
            <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/*" element={<ProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></ProtectedRoute>} />

            {/* Parent routes */}
            <Route path="/parent" element={<ProtectedRoute allowedRoles={["parent"]}><ParentDashboard /></ProtectedRoute>} />
            <Route path="/parent/*" element={<ProtectedRoute allowedRoles={["parent"]}><ParentDashboard /></ProtectedRoute>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
