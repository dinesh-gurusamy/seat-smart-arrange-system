
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Building, Plus, Edit, Trash2, Users, Grid3x3 } from 'lucide-react';

const ManageRooms = () => {
  const [rooms, setRooms] = useState([
    { id: 1, name: 'Hall A-101', capacity: 25, rows: 5, columns: 5, disabledSeats: 2, isActive: true },
    { id: 2, name: 'Hall A-102', capacity: 25, rows: 5, columns: 5, disabledSeats: 0, isActive: true },
    { id: 3, name: 'Hall B-201', capacity: 25, rows: 5, columns: 5, disabledSeats: 1, isActive: true },
    { id: 4, name: 'Hall B-202', capacity: 25, rows: 5, columns: 5, disabledSeats: 3, isActive: false },
  ]);

  const [newRoom, setNewRoom] = useState({
    name: '',
    capacity: 25,
    rows: 5,
    columns: 5
  });

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleAddRoom = () => {
    const room = {
      id: rooms.length + 1,
      ...newRoom,
      disabledSeats: 0,
      isActive: true
    };
    setRooms([...rooms, room]);
    setNewRoom({ name: '', capacity: 25, rows: 5, columns: 5 });
    setIsAddDialogOpen(false);
  };

  const toggleRoomStatus = (id: number) => {
    setRooms(rooms.map(room => 
      room.id === id ? { ...room, isActive: !room.isActive } : room
    ));
  };

  const deleteRoom = (id: number) => {
    setRooms(rooms.filter(room => room.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Rooms</h1>
          <p className="text-gray-600 mt-2">
            Add, edit, and configure exam halls
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Room
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Room</DialogTitle>
              <DialogDescription>
                Configure a new exam hall with seating arrangement
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="roomName">Room Name</Label>
                <Input
                  id="roomName"
                  placeholder="e.g., Hall A-103"
                  value={newRoom.name}
                  onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rows">Rows</Label>
                  <Input
                    id="rows"
                    type="number"
                    min="3"
                    max="10"
                    value={newRoom.rows}
                    onChange={(e) => setNewRoom({ ...newRoom, rows: parseInt(e.target.value) || 5 })}
                  />
                </div>
                <div>
                  <Label htmlFor="columns">Columns</Label>
                  <Input
                    id="columns"
                    type="number"
                    min="3"
                    max="10"
                    value={newRoom.columns}
                    onChange={(e) => setNewRoom({ ...newRoom, columns: parseInt(e.target.value) || 5 })}
                  />
                </div>
              </div>
              <div>
                <Label>Total Capacity</Label>
                <div className="mt-1 p-2 bg-gray-50 rounded text-sm text-gray-600">
                  {newRoom.rows * newRoom.columns} seats
                </div>
              </div>
              <Button onClick={handleAddRoom} className="w-full">
                Add Room
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Room Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rooms.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Rooms</CardTitle>
            <Building className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rooms.filter(r => r.isActive).length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Capacity</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {rooms.filter(r => r.isActive).reduce((sum, r) => sum + r.capacity - r.disabledSeats, 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disabled Seats</CardTitle>
            <Grid3x3 className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {rooms.reduce((sum, r) => sum + r.disabledSeats, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rooms List */}
      <div className="grid gap-6">
        {rooms.map((room) => (
          <Card key={room.id} className={`${!room.isActive ? 'opacity-60' : ''}`}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center">
                    <Building className="mr-2 h-5 w-5" />
                    {room.name}
                    {room.isActive ? (
                      <Badge className="ml-2" variant="default">Active</Badge>
                    ) : (
                      <Badge className="ml-2" variant="secondary">Inactive</Badge>
                    )}
                  </CardTitle>
                  <CardDescription>
                    {room.rows} × {room.columns} seating arrangement
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => toggleRoomStatus(room.id)}
                  >
                    {room.isActive ? 'Deactivate' : 'Activate'}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => deleteRoom(room.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded">
                  <div className="text-lg font-semibold text-blue-600">{room.capacity}</div>
                  <div className="text-xs text-blue-800">Total Seats</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded">
                  <div className="text-lg font-semibold text-green-600">
                    {room.capacity - room.disabledSeats}
                  </div>
                  <div className="text-xs text-green-800">Available</div>
                </div>
                <div className="text-center p-3 bg-red-50 rounded">
                  <div className="text-lg font-semibold text-red-600">{room.disabledSeats}</div>
                  <div className="text-xs text-red-800">Disabled</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="text-lg font-semibold text-gray-600">
                    {room.rows}×{room.columns}
                  </div>
                  <div className="text-xs text-gray-800">Layout</div>
                </div>
              </div>

              {/* Visual seat layout */}
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Seat Layout Preview:</h4>
                <div 
                  className="grid gap-1 max-w-xs"
                  style={{ gridTemplateColumns: `repeat(${room.columns}, 1fr)` }}
                >
                  {Array.from({ length: room.capacity }).map((_, index) => (
                    <div
                      key={index}
                      className={`w-6 h-6 text-xs flex items-center justify-center rounded ${
                        index < room.disabledSeats 
                          ? 'bg-red-200 text-red-700' 
                          : 'bg-green-200 text-green-700'
                      }`}
                    >
                      {index + 1}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ManageRooms;
