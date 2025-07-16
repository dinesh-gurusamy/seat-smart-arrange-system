
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Shield, Users, Calendar, MapPin, BookOpen, ArrowRight, Sparkles } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Smart Seating
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/search">
                <Button variant="ghost" className="hover:bg-blue-50">
                  <Search className="w-4 h-4 mr-2" />
                  Find Seat
                </Button>
              </Link>
              <Link to="/auth">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Staff Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-8">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Next-Gen Exam Management</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Smart Seating
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Made Simple
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Revolutionize your exam management with intelligent seating arrangements, 
            real-time tracking, and seamless student experience.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/search">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6">
                <Search className="w-5 h-5 mr-2" />
                Find Your Seat
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-white/60 backdrop-blur-sm border-white/30 hover:bg-white/80">
                <Shield className="w-5 h-5 mr-2" />
                Staff Portal
              </Button>
            </Link>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-200/30 rounded-full blur-xl animate-pulse delay-1000"></div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage examinations efficiently and effectively
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/60 backdrop-blur-sm hover:bg-white/80">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">Instant Seat Finder</CardTitle>
                <CardDescription className="text-base">
                  Students can quickly locate their exam seats with our intelligent search system
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link to="/search">
                  <Button variant="ghost" className="group-hover:bg-blue-50 transition-colors">
                    Try Now <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/60 backdrop-blur-sm hover:bg-white/80">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">Smart Management</CardTitle>
                <CardDescription className="text-base">
                  Comprehensive tools for managing students, rooms, and examination schedules
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link to="/auth">
                  <Button variant="ghost" className="group-hover:bg-green-50 transition-colors">
                    Get Started <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/60 backdrop-blur-sm hover:bg-white/80">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">Automated Scheduling</CardTitle>
                <CardDescription className="text-base">
                  AI-powered seating arrangements that optimize space and maintain integrity
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button variant="ghost" className="group-hover:bg-purple-50 transition-colors">
                  Learn More <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-white/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                10,000+
              </div>
              <div className="text-gray-600 font-medium">Students Managed</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                500+
              </div>
              <div className="text-gray-600 font-medium">Examinations Conducted</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                99.9%
              </div>
              <div className="text-gray-600 font-medium">System Reliability</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="border-0 bg-gradient-to-br from-blue-600 to-purple-600 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-black/10"></div>
            <CardContent className="relative py-16 px-8">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Ready to Transform Your Exam Management?
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                Join hundreds of institutions already using Smart Seating System
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/search">
                  <Button size="lg" variant="secondary" className="text-lg px-8 py-6 bg-white text-blue-600 hover:bg-blue-50">
                    <Search className="w-5 h-5 mr-2" />
                    Search Seat
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-white hover:bg-white/10">
                    <Shield className="w-5 h-5 mr-2" />
                    Admin Access
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">Smart Seating System</span>
          </div>
          <p className="text-gray-400 mb-6">
            Intelligent exam management for modern educational institutions
          </p>
          <div className="flex justify-center space-x-8 text-sm text-gray-400">
            <span>© 2024 Smart Seating System</span>
            <span>•</span>
            <span>All rights reserved</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
