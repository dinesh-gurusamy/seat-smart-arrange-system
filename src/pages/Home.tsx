
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, MapPin, BookOpen, Shield } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <MapPin className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Smart Seating System</h1>
            </div>
            <div className="flex space-x-4">
              <Link to="/student/search">
                <Button variant="outline">Find My Seat</Button>
              </Link>
              <Link to="/login">
                <Button>Staff Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Streamline Your Exam Seating Process
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Automatically assign students to seats across multiple rooms, ensure fair distribution, 
            and eliminate manual errors with our intelligent seating arrangement system.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Smart Assignment</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Automatically distribute students across rooms with intelligent algorithms
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle>Secure Spacing</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Ensure proper spacing with 1 student per bench for exam security
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <BookOpen className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>Department Separation</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Prevent students from same department sitting together
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <MapPin className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <CardTitle>Easy Lookup</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Quick seat finder by name or roll number for students
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
          <p className="text-gray-600 mb-8">
            Choose your role to access the appropriate dashboard
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/student/search">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <Users className="mr-2 h-5 w-5" />
                I'm a Student
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" className="w-full sm:w-auto">
                <Shield className="mr-2 h-5 w-5" />
                Staff Access
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
