
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building, Users, Calendar, FileText, Eye, Download } from 'lucide-react';

const FacultyDashboard = () => {
  // Mock data for faculty assignments
  const assignedRooms = [
    { 
      id: 1, 
      name: 'Hall A-101', 
      exam: 'Mathematics Final', 
      students: 23, 
      date: '2024-01-15',
      time: '9:00 AM - 12:00 PM',
      status: 'upcoming'
    },
    { 
      id: 2, 
      name: 'Hall B-201', 
      exam: 'Physics Mid-term', 
      students: 24, 
      date: '2024-01-18',
      time: '2:00 PM - 5:00 PM',
      status: 'upcoming'
    },
  ];

  const recentPlans = [
    { exam: 'Chemistry Lab Exam', room: 'Lab-301', generated: '2 days ago' },
    { exam: 'Mathematics Quiz', room: 'Hall A-102', generated: '5 days ago' },
    { exam: 'Physics Practical', room: 'Lab-201', generated: '1 week ago' },
  ];

  const stats = {
    assignedRooms: 2,
    totalStudents: 47,
    upcomingExams: 2,
    completedExams: 8
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Faculty Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Manage your assigned rooms and supervise examinations
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assigned Rooms</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.assignedRooms}</div>
            <p className="text-xs text-muted-foreground">
              Currently supervising
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              Under supervision
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Exams</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.upcomingExams}</div>
            <p className="text-xs text-muted-foreground">
              Next 7 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedExams}</div>
            <p className="text-xs text-muted-foreground">
              This semester
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Assigned Rooms */}
      <Card>
        <CardHeader>
          <CardTitle>Current Assignments</CardTitle>
          <CardDescription>
            Rooms and exams you are assigned to supervise
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assignedRooms.map((assignment) => (
              <div key={assignment.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg flex items-center">
                      <Building className="mr-2 h-5 w-5 text-blue-600" />
                      {assignment.name}
                    </h3>
                    <p className="text-gray-600">{assignment.exam}</p>
                  </div>
                  <Badge variant="outline">
                    {assignment.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="mr-2 h-4 w-4" />
                    {assignment.date}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="mr-2 h-4 w-4" />
                    {assignment.students} students
                  </div>
                  <div className="text-sm text-gray-600">
                    {assignment.time}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    View Seating Plan
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download List
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Seating Plans */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Seating Plans</CardTitle>
          <CardDescription>
            Recently generated seating arrangements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentPlans.map((plan, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">{plan.exam}</p>
                    <p className="text-xs text-gray-500">{plan.room}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{plan.generated}</span>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks for exam supervision
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
              <FileText className="h-6 w-6 mb-2" />
              View All Plans
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
              <Download className="h-6 w-6 mb-2" />
              Download Reports
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
              <Users className="h-6 w-6 mb-2" />
              Student Lookup
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FacultyDashboard;
