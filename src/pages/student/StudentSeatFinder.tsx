
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Search, MapPin, User, Hash, Building, Calendar, Download, ArrowLeft } from 'lucide-react';

const StudentSeatFinder = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');

  // Mock search function - replace with actual API call
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError('Please enter your roll number or name');
      return;
    }

    setIsSearching(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock result - replace with actual API response
      if (searchQuery.toLowerCase().includes('john') || searchQuery === '21CS001') {
        setSearchResult({
          student: {
            name: 'John Doe',
            rollNumber: '21CS001',
            department: 'Computer Science',
            semester: '6th'
          },
          seat: {
            hallNumber: 'A-101',
            seatNumber: 'B-15',
            row: 3,
            column: 5
          },
          exam: {
            name: 'Data Structures Final',
            date: '2024-01-15',
            time: '9:00 AM - 12:00 PM'
          }
        });
      } else {
        setError('Student not found. Please check your roll number or name.');
        setSearchResult(null);
      }
    } finally {
      setIsSearching(false);
    }
  };

  const handleDownloadAdmitCard = () => {
    // Mock download function
    console.log('Downloading admit card...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <MapPin className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Find Your Seat</h1>
            </div>
            <Link to="/">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="mr-2 h-5 w-5" />
              Student Seat Lookup
            </CardTitle>
            <CardDescription>
              Enter your roll number or full name to find your exam seat
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <Input
                  placeholder="Enter roll number (e.g., 21CS001) or full name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="text-lg py-6"
                />
              </div>
              <Button 
                onClick={handleSearch}
                disabled={isSearching}
                size="lg"
                className="px-8"
              >
                {isSearching ? 'Searching...' : 'Search'}
              </Button>
            </div>

            {error && (
              <Alert className="mt-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800 font-medium mb-2">Search Tips:</p>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• Use your complete roll number (e.g., 21CS001, 20ME045)</li>
                <li>• Enter your full name as registered (First Name Last Name)</li>
                <li>• Search is case-insensitive</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        {searchResult && (
          <div className="space-y-6">
            {/* Student Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-green-700">
                  <User className="mr-2 h-5 w-5" />
                  Student Found!
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Student Details</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span className="font-medium">{searchResult.student.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Roll Number:</span>
                        <span className="font-medium">{searchResult.student.rollNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Department:</span>
                        <Badge variant="secondary">{searchResult.student.department}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Semester:</span>
                        <span className="font-medium">{searchResult.student.semester}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-3">Exam Details</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subject:</span>
                        <span className="font-medium">{searchResult.exam.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date:</span>
                        <span className="font-medium">{searchResult.exam.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Time:</span>
                        <span className="font-medium">{searchResult.exam.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Seat Assignment Card */}
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center text-green-700">
                  <Building className="mr-2 h-5 w-5" />
                  Your Seat Assignment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {searchResult.seat.hallNumber}
                    </div>
                    <div className="text-sm text-gray-600">Exam Hall</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {searchResult.seat.seatNumber}
                    </div>
                    <div className="text-sm text-gray-600">Seat Number</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-green-600 mb-2">
                      Row {searchResult.seat.row}, Col {searchResult.seat.column}
                    </div>
                    <div className="text-sm text-gray-600">Position</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={handleDownloadAdmitCard} className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Download Admit Card
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <MapPin className="mr-2 h-4 w-4" />
                    View Hall Map
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Important Instructions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Important Instructions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Arrive at the exam hall at least 30 minutes before the scheduled time
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Bring your ID card and admit card for verification
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Mobile phones and electronic devices are strictly prohibited
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Follow all COVID-19 safety protocols if applicable
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Demo Info */}
        {!searchResult && !error && (
          <Card>
            <CardHeader>
              <CardTitle>Demo Information</CardTitle>
              <CardDescription>
                Try searching with these sample credentials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium mb-2">Search by Roll Number:</p>
                  <p className="text-sm text-gray-600">21CS001</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium mb-2">Search by Name:</p>
                  <p className="text-sm text-gray-600">John Doe</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default StudentSeatFinder;
