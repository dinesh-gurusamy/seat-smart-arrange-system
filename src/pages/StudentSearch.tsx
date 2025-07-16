
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  MapPin, 
  Clock, 
  Calendar, 
  Building, 
  User, 
  BookOpen,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Home
} from 'lucide-react';
import { studentsApi } from '@/services/api';

const StudentSearch = () => {
  const [rollNumber, setRollNumber] = useState('');
  const [seatInfo, setSeatInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!rollNumber.trim()) {
      setError('Please enter a roll number');
      return;
    }

    setIsLoading(true);
    setError('');
    setSeatInfo(null);

    try {
      const data = await studentsApi.findBySeat(rollNumber);
      if (data && data.length > 0) {
        setSeatInfo(data[0]);
      } else {
        setError('No seating assignment found for this roll number');
      }
    } catch (err) {
      console.error('Error searching seat:', err);
      setError('Failed to search for seat information');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Smart Seating
              </span>
            </Link>
            <Link to="/">
              <Button variant="ghost" className="hover:bg-blue-50">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6">
            <Search className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Student Seat Finder</span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Find Your
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Exam Seat
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enter your roll number to quickly locate your assigned seat for upcoming examinations
          </p>
        </div>

        {/* Search Card */}
        <Card className="mb-8 border-0 shadow-xl bg-white/80 backdrop-blur-md">
          <CardHeader className="text-center pb-4">
            <CardTitle className="flex items-center justify-center space-x-2 text-xl">
              <Search className="w-6 h-6 text-blue-600" />
              <span>Seat Search</span>
            </CardTitle>
            <CardDescription className="text-base">
              Enter your roll number to find your assigned seat for upcoming exams
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="rollNumber" className="text-gray-700 font-medium">Roll Number</Label>
                <Input
                  id="rollNumber"
                  placeholder="Enter your roll number (e.g., 21CS001)"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value.toUpperCase())}
                  onKeyPress={handleKeyPress}
                  className="mt-2 h-12 text-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-end">
                <Button 
                  onClick={handleSearch} 
                  disabled={isLoading}
                  className="h-12 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      Search
                    </>
                  )}
                </Button>
              </div>
            </div>

            {error && (
              <Alert className="mt-4 border-red-200 bg-red-50" variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Seat Information */}
        {seatInfo && (
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-md overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
              <CardTitle className="flex items-center text-green-700">
                <CheckCircle className="mr-3 h-6 w-6" />
                Seat Assignment Found
              </CardTitle>
              <CardDescription className="text-green-600">
                Your seat details for the examination
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Student Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Information</h3>
                  
                  <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{seatInfo.student?.name}</p>
                      <p className="text-sm text-gray-600">Roll: {seatInfo.student?.roll_number}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-lg">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Building className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{seatInfo.room?.name}</p>
                      <p className="text-sm text-gray-600">Examination Hall</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-indigo-50 rounded-lg">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        Seat {seatInfo.seat_number}
                      </p>
                      <p className="text-sm text-gray-600">
                        Row {seatInfo.seat_row}, Column {seatInfo.seat_column}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Exam Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Exam Information</h3>
                  
                  {seatInfo.exam && (
                    <>
                      <div className="flex items-start space-x-4 p-4 bg-orange-50 rounded-lg">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{seatInfo.exam.name}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(seatInfo.exam.date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4 p-4 bg-red-50 rounded-lg">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                          <Clock className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {seatInfo.exam.start_time} - {seatInfo.exam.end_time}
                          </p>
                          <p className="text-sm text-gray-600">Exam Duration</p>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="pt-4">
                    <Badge className="bg-green-100 text-green-800 border-green-200 px-4 py-2 text-sm font-medium">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Seat Confirmed
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Important Instructions */}
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-4 text-lg">Important Instructions:</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Arrive 15 minutes before exam time
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Bring student ID and admit card
                    </li>
                  </ul>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Take only your assigned seat
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Mobile phones not allowed
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Help Section */}
        <div className="mt-12 text-center">
          <Card className="border-0 bg-white/60 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-gray-600 mb-4">
                If you can't find your seat assignment or have any questions, please contact the examination office.
              </p>
              <Link to="/">
                <Button variant="outline" className="bg-white/80 hover:bg-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentSearch;
