
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UploadStudents from "./pages/admin/UploadStudents";
import ManageRooms from "./pages/admin/ManageRooms";
import SeatingGenerator from "./pages/admin/SeatingGenerator";
import FacultyLayout from "./layouts/FacultyLayout";
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import StudentSeatFinder from "./pages/student/StudentSeatFinder";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/student/search" element={<StudentSeatFinder />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute role="admin">
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AdminDashboard />} />
              <Route path="upload-students" element={<UploadStudents />} />
              <Route path="manage-rooms" element={<ManageRooms />} />
              <Route path="generate-seating" element={<SeatingGenerator />} />
            </Route>
            
            {/* Faculty Routes */}
            <Route path="/faculty" element={
              <ProtectedRoute role="faculty">
                <FacultyLayout />
              </ProtectedRoute>
            }>
              <Route index element={<FacultyDashboard />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
