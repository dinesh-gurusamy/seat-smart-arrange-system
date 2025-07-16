
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Pages
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import DashboardLayout from "./layouts/DashboardLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import StudentManager from "./pages/admin/StudentManager";
import RoomManager from "./pages/admin/RoomManager";
import ExamManager from "./pages/admin/ExamManager";
import SeatingManager from "./pages/admin/SeatingManager";
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import StudentSearch from "./pages/StudentSearch";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/search" element={<StudentSearch />} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={
                  <ProtectedRoute role="admin">
                    <DashboardLayout userType="admin" />
                  </ProtectedRoute>
                }>
                  <Route index element={<AdminDashboard />} />
                  <Route path="students" element={<StudentManager />} />
                  <Route path="rooms" element={<RoomManager />} />
                  <Route path="exams" element={<ExamManager />} />
                  <Route path="seating" element={<SeatingManager />} />
                </Route>
                
                {/* Faculty Routes */}
                <Route path="/faculty" element={
                  <ProtectedRoute role="faculty">
                    <DashboardLayout userType="faculty" />
                  </ProtectedRoute>
                }>
                  <Route index element={<FacultyDashboard />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </div>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
