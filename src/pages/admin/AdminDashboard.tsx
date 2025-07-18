
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Building2, 
  Calendar, 
  UserCheck, 
  TrendingUp, 
  BookOpen,
  ArrowUpRight,
  Activity,
  Clock
} from 'lucide-react';
import { studentsService } from '@/services/studentsService';
import { roomsService } from '@/services/roomsService';
import { examsService } from '@/services/examsService';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalRooms: 0,
    activeExams: 0,
    upcomingExams: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [students, rooms, exams] = await Promise.all([
          studentsService.getAll(),
          roomsService.getAll(),
          examsService.getAll()
        ]);

        const today = new Date().toISOString().split('T')[0];
        const activeExams = exams.filter(exam => exam.date === today).length;
        const upcomingExams = exams.filter(exam => exam.date > today).length;

        setStats({
          totalStudents: students.length,
          totalRooms: rooms.filter(room => room.is_active).length,
          activeExams,
          upcomingExams
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const quickActions = [
    {
      title: 'Manage Students',
      description: 'Add, edit, and organize student records',
      icon: Users,
      href: '/admin/students',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      title: 'Configure Rooms',
      description: 'Set up examination halls and seating',
      icon: Building2,
      href: '/admin/rooms',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      title: 'Schedule Exams',
      description: 'Create and manage exam schedules',
      icon: Calendar,
      href: '/admin/exams',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700'
    },
    {
      title: 'Generate Seating',
      description: 'Create optimized seating arrangements',
      icon: UserCheck,
      href: '/admin/seating',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700'
    }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-blue-100 text-lg">
              Welcome back! Here's what's happening with your seating system.
            </p>
          </div>
          <div className="hidden lg:block">
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center">
              <BookOpen className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Total Students</CardTitle>
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900">{stats.totalStudents.toLocaleString()}</div>
            <p className="text-xs text-blue-600 mt-1">
              <TrendingUp className="inline w-3 h-3 mr-1" />
              Registered in system
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Active Rooms</CardTitle>
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <Building2 className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900">{stats.totalRooms}</div>
            <p className="text-xs text-green-600 mt-1">
              <Activity className="inline w-3 h-3 mr-1" />
              Available for exams
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">Active Exams</CardTitle>
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
              <Calendar className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-900">{stats.activeExams}</div>
            <p className="text-xs text-purple-600 mt-1">
              <Clock className="inline w-3 h-3 mr-1" />
              Currently ongoing
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">Upcoming Exams</CardTitle>
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-900">{stats.upcomingExams}</div>
            <p className="text-xs text-orange-600 mt-1">
              <Calendar className="inline w-3 h-3 mr-1" />
              Scheduled
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.href} to={action.href}>
                <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white cursor-pointer h-full">
                  <CardHeader className="pb-4">
                    <div className={`w-12 h-12 rounded-xl ${action.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-6 h-6 ${action.textColor}`} />
                    </div>
                    <CardTitle className="text-lg group-hover:text-gray-900 transition-colors">
                      {action.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {action.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm font-medium text-gray-400 group-hover:text-gray-600 transition-colors">
                      <span>Get started</span>
                      <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">System Overview</CardTitle>
          <CardDescription>
            Current status of your examination management system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <div className="text-2xl font-bold text-blue-600 mb-2">{stats.totalStudents + stats.totalRooms}</div>
              <div className="text-sm text-blue-800">Total System Entities</div>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <div className="text-2xl font-bold text-green-600 mb-2">
                {Math.round((stats.totalRooms / Math.max(stats.totalStudents, 1)) * 1000)}
              </div>
              <div className="text-sm text-green-800">Capacity Utilization</div>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <div className="text-2xl font-bold text-purple-600 mb-2">
                {stats.activeExams + stats.upcomingExams}
              </div>
              <div className="text-sm text-purple-800">Total Scheduled Exams</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
