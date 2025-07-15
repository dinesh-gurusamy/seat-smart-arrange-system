
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Calendar, Clock, Users } from 'lucide-react';
import { examsApi } from '@/services/api';
import { useToast } from '@/components/ui/use-toast';

const ManageExams = () => {
  const [exams, setExams] = useState([]);
  const [newExam, setNewExam] = useState({
    name: '',
    date: '',
    start_time: '',
    end_time: ''
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const data = await examsApi.getAll();
      setExams(data);
    } catch (error) {
      console.error('Error fetching exams:', error);
      toast({
        title: "Error",
        description: "Failed to load exams",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddExam = async () => {
    try {
      await examsApi.create(newExam);
      setNewExam({ name: '', date: '', start_time: '', end_time: '' });
      setIsAddDialogOpen(false);
      await fetchExams();
      toast({
        title: "Success",
        description: "Exam created successfully",
      });
    } catch (error) {
      console.error('Error creating exam:', error);
      toast({
        title: "Error",
        description: "Failed to create exam",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-96">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Exams</h1>
          <p className="text-gray-600 mt-2">
            Create and manage examination schedules
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Exam
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Exam</DialogTitle>
              <DialogDescription>
                Create a new examination schedule
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="examName">Exam Name</Label>
                <Input
                  id="examName"
                  placeholder="e.g., Mid-Semester Exam"
                  value={newExam.name}
                  onChange={(e) => setNewExam({ ...newExam, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="examDate">Date</Label>
                <Input
                  id="examDate"
                  type="date"
                  value={newExam.date}
                  onChange={(e) => setNewExam({ ...newExam, date: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={newExam.start_time}
                    onChange={(e) => setNewExam({ ...newExam, start_time: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={newExam.end_time}
                    onChange={(e) => setNewExam({ ...newExam, end_time: e.target.value })}
                  />
                </div>
              </div>
              <Button onClick={handleAddExam} className="w-full">
                Create Exam
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Exams List */}
      <div className="grid gap-6">
        {exams.map((exam: any) => (
          <Card key={exam.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    {exam.name}
                  </CardTitle>
                  <CardDescription>
                    {new Date(exam.date).toLocaleDateString()} • {exam.start_time} - {exam.end_time}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded">
                  <div className="text-lg font-semibold text-blue-600">
                    {new Date(exam.date).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-blue-800">Date</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded">
                  <div className="text-lg font-semibold text-green-600">
                    {exam.start_time}
                  </div>
                  <div className="text-xs text-green-800">Start Time</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded">
                  <div className="text-lg font-semibold text-purple-600">
                    {exam.end_time}
                  </div>
                  <div className="text-xs text-purple-800">End Time</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ManageExams;
