
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { Layout } from "@/components/layout/Layout";

// Pages
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Courses from "@/pages/Courses";
import Fees from "@/pages/Fees";
import Announcements from "@/pages/Announcements";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/fees" element={<Fees />} />
              <Route path="/announcements" element={<Announcements />} />
              {/* Additional routes to be implemented */}
              <Route path="/students" element={<div className="p-10 text-center">Students Management (Coming Soon)</div>} />
              <Route path="/faculty" element={<div className="p-10 text-center">Faculty Management (Coming Soon)</div>} />
              <Route path="/attendance" element={<div className="p-10 text-center">Attendance Tracking (Coming Soon)</div>} />
              <Route path="/syllabus" element={<div className="p-10 text-center">Syllabus Repository (Coming Soon)</div>} />
              <Route path="/exams" element={<div className="p-10 text-center">Exam Registration (Coming Soon)</div>} />
              <Route path="/timetable" element={<div className="p-10 text-center">Timetable Viewer (Coming Soon)</div>} />
              <Route path="/assignments" element={<div className="p-10 text-center">Assignments Manager (Coming Soon)</div>} />
              <Route path="/no-dues" element={<div className="p-10 text-center">No-Dues Management (Coming Soon)</div>} />
              <Route path="/results" element={<div className="p-10 text-center">Result Portal (Coming Soon)</div>} />
              <Route path="/feedback" element={<div className="p-10 text-center">Faculty Feedback (Coming Soon)</div>} />
              <Route path="/notes" element={<div className="p-10 text-center">Lecture Notes Repository (Coming Soon)</div>} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
