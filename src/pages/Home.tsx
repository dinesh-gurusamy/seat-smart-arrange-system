
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calendar, MapPin, Search, UserPlus, LogIn } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Smart Seating Arrangement System
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Efficiently manage exam seating arrangements with automated allocation, 
            real-time tracking, and comprehensive student management tools.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Search className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Find Your Seat</CardTitle>
              <CardDescription>
                Students can quickly find their exam seat assignments
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link to="/student/search">
                <Button className="w-full">Search Seat</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <LogIn className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle>Staff Login</CardTitle>
              <CardDescription>
                Access admin and faculty management tools
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link to="/login">
                <Button variant="outline" className="w-full">Sign In</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <UserPlus className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>Staff Registration</CardTitle>
              <CardDescription>
                Register as faculty or administrator
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link to="/register">
                <Button variant="outline" className="w-full">Register</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-8">System Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Student Management</h3>
              <p className="text-gray-600">
                Efficiently manage student data, departments, and course information
              </p>
            </div>
            <div className="text-center">
              <Calendar className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Exam Scheduling</h3>
              <p className="text-gray-600">
                Schedule exams with automated seating arrangement generation
              </p>
            </div>
            <div className="text-center">
              <MapPin className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Room Management</h3>
              <p className="text-gray-600">
                Configure examination halls and manage seating capacity
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
