
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Shuffle, Download, Eye, Settings, AlertCircle, CheckCircle, Users } from 'lucide-react';

const SeatingGenerator = () => {
  const [selectedExam, setSelectedExam] = useState('');
  const [generationProgress, setGenerationProgress] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationResult, setGenerationResult] = useState<any>(null);

  // Mock data
  const exams = [
    { id: '1', name: 'Mathematics Final Exam', students: 234, date: '2024-01-15' },
    { id: '2', name: 'Physics Mid-term', students: 189, date: '2024-01-18' },
    { id: '3', name: 'Chemistry Lab Exam', students: 156, date: '2024-01-20' },
  ];

  const rooms = [
    { id: 1, name: 'Hall A-101', capacity: 23, available: true },
    { id: 2, name: 'Hall A-102', capacity: 25, available: true },
    { id: 3, name: 'Hall B-201', capacity: 24, available: true },
    { id: 4, name: 'Hall B-202', capacity: 22, available: false },
  ];

  const handleGenerate = async () => {
    if (!selectedExam) return;

    setIsGenerating(true);
    setGenerationProgress(0);

    // Simulate generation process
    const steps = [10, 25, 40, 60, 80, 100];
    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setGenerationProgress(step);
    }

    // Mock generation result
    setGenerationResult({
      success: true,
      totalStudents: 234,
      assignedStudents: 232,
      unassignedStudents: 2,
      roomsUsed: 10,
      conflicts: [],
      roomAllocation: [
        { room: 'Hall A-101', students: 23, departments: ['CS', 'IT'] },
        { room: 'Hall A-102', students: 25, departments: ['ECE', 'EEE'] },
        { room: 'Hall B-201', students: 24, departments: ['MECH', 'CIVIL'] },
        { room: 'Hall B-202', students: 22, departments: ['CHEM', 'BIO'] },
      ]
    });

    setIsGenerating(false);
  };

  const selectedExamData = exams.find(e => e.id === selectedExam);
  const availableCapacity = rooms.filter(r => r.available).reduce((sum, r) => sum + r.capacity, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Generate Seating Plan</h1>
        <p className="text-gray-600 mt-2">
          Automatically assign students to seats with intelligent distribution
        </p>
      </div>

      {/* Exam Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Exam</CardTitle>
          <CardDescription>
            Choose the exam for which you want to generate seating arrangements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Select value={selectedExam} onValueChange={setSelectedExam}>
              <SelectTrigger>
                <SelectValue placeholder="Select an exam" />
              </SelectTrigger>
              <SelectContent>
                {exams.map((exam) => (
                  <SelectItem key={exam.id} value={exam.id}>
                    <div className="flex justify-between items-center w-full">
                      <span>{exam.name}</span>
                      <Badge variant="outline" className="ml-2">
                        {exam.students} students
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedExamData && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-blue-900">Students:</span>
                    <span className="ml-2 text-blue-700">{selectedExamData.students}</span>
                  </div>
                  <div>
                    <span className="font-medium text-blue-900">Date:</span>
                    <span className="ml-2 text-blue-700">{selectedExamData.date}</span>
                  </div>
                  <div>
                    <span className="font-medium text-blue-900">Available Capacity:</span>
                    <span className="ml-2 text-blue-700">{availableCapacity} seats</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Room Status */}
      <Card>
        <CardHeader>
          <CardTitle>Available Rooms</CardTitle>
          <CardDescription>
            Current status of exam halls
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {rooms.map((room) => (
              <div
                key={room.id}
                className={`p-4 rounded-lg border ${
                  room.available 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-red-50 border-red-200'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{room.name}</h4>
                  <Badge variant={room.available ? 'default' : 'destructive'}>
                    {room.available ? 'Available' : 'Occupied'}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">
                  Capacity: {room.capacity} students
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Generation Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Generation Settings</CardTitle>
          <CardDescription>
            Configure how students should be assigned to seats
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center mb-2">
                  <Settings className="h-4 w-4 mr-2" />
                  <span className="font-medium">Assignment Rules</span>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 1 student per bench</li>
                  <li>• Separate departments by room</li>
                  <li>• Random within department</li>
                  <li>• Skip disabled seats</li>
                </ul>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center mb-2">
                  <Users className="h-4 w-4 mr-2" />
                  <span className="font-medium">Capacity Check</span>
                </div>
                {selectedExamData && (
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Students:</span>
                      <span>{selectedExamData.students}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Available seats:</span>
                      <span>{availableCapacity}</span>
                    </div>
                    <div className={`flex justify-between font-medium ${
                      selectedExamData.students <= availableCapacity 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      <span>Status:</span>
                      <span>
                        {selectedExamData.students <= availableCapacity 
                          ? 'Sufficient capacity' 
                          : 'Insufficient capacity'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {selectedExamData && selectedExamData.students > availableCapacity && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Warning: Not enough seats available. Need {selectedExamData.students - availableCapacity} more seats.
                  Please activate more rooms or reduce student count.
                </AlertDescription>
              </Alert>
            )}

            <div className="flex gap-4">
              <Button 
                onClick={handleGenerate}
                disabled={!selectedExam || isGenerating || (selectedExamData && selectedExamData.students > availableCapacity)}
                className="flex-1"
              >
                <Shuffle className="mr-2 h-4 w-4" />
                {isGenerating ? 'Generating...' : 'Generate Seating Plan'}
              </Button>
            </div>

            {isGenerating && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Generating seating arrangement...</span>
                  <span>{generationProgress}%</span>
                </div>
                <Progress value={generationProgress} className="w-full" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Generation Results */}
      {generationResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
              Generation Complete
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Seating plan generated successfully! {generationResult.assignedStudents} students assigned to seats.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {generationResult.totalStudents}
                  </div>
                  <div className="text-sm text-blue-800">Total Students</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {generationResult.assignedStudents}
                  </div>
                  <div className="text-sm text-green-800">Assigned</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {generationResult.unassignedStudents}
                  </div>
                  <div className="text-sm text-red-800">Unassigned</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {generationResult.roomsUsed}
                  </div>
                  <div className="text-sm text-purple-800">Rooms Used</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Room Allocation Summary:</h4>
                <div className="space-y-2">
                  {generationResult.roomAllocation.map((allocation: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <div>
                        <span className="font-medium">{allocation.room}</span>
                        <span className="ml-2 text-sm text-gray-600">
                          ({allocation.students} students)
                        </span>
                      </div>
                      <div className="flex gap-1">
                        {allocation.departments.map((dept: string) => (
                          <Badge key={dept} variant="outline">{dept}</Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <Button className="flex-1">
                  <Eye className="mr-2 h-4 w-4" />
                  Preview Seating Plan
                </Button>
                <Button variant="outline" className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SeatingGenerator;
