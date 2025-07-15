
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Clock, Calendar, Building, User } from 'lucide-react';
import { studentsApi } from '@/services/api';

const StudentSeatFinder = () => {
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
        setSeatInfo(data[0]); // Get the first/latest seating assignment
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Find Your Seat</h1>
          <p className="text-gray-600 text-lg">
            Enter your roll number to find your examination seat
          </p>
        </div>

        {/* Search Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="mr-2 h-5 w-5" />
              Seat Search
            </CardTitle>
            <CardDescription>
              Enter your roll number to find your assigned seat for upcoming exams
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="rollNumber">Roll Number</Label>
                <Input
                  id="rollNumber"
                  placeholder="Enter your roll number (e.g., 21CS001)"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value.toUpperCase())}
                  onKeyPress={handleKeyPress}
                  className="mt-1"
                />
              </div>
              <div className="flex items-end">
                <Button onClick={handleSearch} disabled={isLoading}>
                  {isLoading ? 'Searching...' : 'Search'}
                </Button>
              </div>
            </div>

            {error && (
              <Alert className="mt-4" variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Seat Information */}
        {seatInfo && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-green-600">
                <MapPin className="mr-2 h-5 w-5" />
                Seat Assignment Found
              </CardTitle>
              <CardDescription>
                Your seat details for the examination
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Student Information */}
                <div className="space-y-4">
                  <div className="flex items-center">
                    <User className="mr-3 h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-semibold">{seatInfo.student?.name}</p>
                      <p className="text-sm text-gray-600">Roll: {seatInfo.student?.roll_number}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Building className="mr-3 h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-semibold">{seatInfo.room?.name}</p>
                      <p className="text-sm text-gray-600">Examination Hall</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <MapPin className="mr-3 h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-semibold">
                        Seat {seatInfo.seat_number} (Row {seatInfo.seat_row}, Col {seatInfo.seat_column})
                      </p>
                      <p className="text-sm text-gray-600">Your assigned seat</p>
                    </div>
                  </div>
                </div>

                {/* Exam Information */}
                <div className="space-y-4">
                  {seatInfo.exam && (
                    <>
                      <div className="flex items-center">
                        <Calendar className="mr-3 h-5 w-5 text-orange-600" />
                        <div>
                          <p className="font-semibold">{seatInfo.exam.name}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(seatInfo.exam.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <Clock className="mr-3 h-5 w-5 text-red-600" />
                        <div>
                          <p className="font-semibold">
                            {seatInfo.exam.start_time} - {seatInfo.exam.end_time}
                          </p>
                          <p className="text-sm text-gray-600">Exam Duration</p>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="pt-4">
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      Seat Confirmed
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Important Instructions */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Important Instructions:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Arrive at the examination hall 15 minutes before the start time</li>
                  <li>• Bring your student ID card and admit card</li>
                  <li>• Only take the assigned seat - do not change seats</li>
                  <li>• Mobile phones and electronic devices are not allowed</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default StudentSeatFinder;
