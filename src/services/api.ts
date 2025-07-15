
import { supabase } from '@/integrations/supabase/client';

// Students API
export const studentsApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('students')
      .select(`
        *,
        department:departments(name, code),
        course:courses(name, code)
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async create(student: {
    name: string;
    roll_number: string;
    email?: string;
    department_id?: string;
    course_id?: string;
    semester?: number;
  }) {
    const { data, error } = await supabase
      .from('students')
      .insert(student)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async bulkCreate(students: any[]) {
    const { data, error } = await supabase
      .from('students')
      .insert(students)
      .select();
    
    if (error) throw error;
    return data;
  },

  async findBySeat(rollNumber: string, examId?: string) {
    let query = supabase
      .from('seating_plans')
      .select(`
        *,
        student:students(name, roll_number),
        room:rooms(name),
        exam:exams(name, date, start_time, end_time)
      `)
      .eq('student.roll_number', rollNumber);

    if (examId) {
      query = query.eq('exam_id', examId);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }
};

// Rooms API
export const roomsApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .order('name');
    
    if (error) throw error;
    return data;
  },

  async create(room: {
    name: string;
    capacity?: number;
    rows?: number;
    columns?: number;
  }) {
    const { data, error } = await supabase
      .from('rooms')
      .insert(room)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async update(id: string, updates: any) {
    const { data, error } = await supabase
      .from('rooms')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('rooms')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// Exams API
export const examsApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('exams')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async create(exam: {
    name: string;
    date: string;
    start_time: string;
    end_time: string;
  }) {
    const { data, error } = await supabase
      .from('exams')
      .insert(exam)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

// Seating Plans API
export const seatingApi = {
  async generateSeatingPlan(examId: string, studentIds: string[], roomIds: string[]) {
    // This would be implemented as an edge function for complex logic
    // For now, we'll implement a simple version
    const seatingPlan = [];
    let studentIndex = 0;
    
    for (const roomId of roomIds) {
      const room = await supabase.from('rooms').select('*').eq('id', roomId).single();
      if (!room.data) continue;
      
      const { rows, columns } = room.data;
      
      for (let row = 1; row <= rows; row++) {
        for (let col = 1; col <= columns; col++) {
          if (studentIndex < studentIds.length) {
            seatingPlan.push({
              exam_id: examId,
              student_id: studentIds[studentIndex],
              room_id: roomId,
              seat_row: row,
              seat_column: col,
              seat_number: ((row - 1) * columns) + col
            });
            studentIndex++;
          }
        }
      }
    }
    
    const { data, error } = await supabase
      .from('seating_plans')
      .insert(seatingPlan)
      .select();
    
    if (error) throw error;
    return data;
  },

  async getSeatingPlan(examId: string) {
    const { data, error } = await supabase
      .from('seating_plans')
      .select(`
        *,
        student:students(name, roll_number),
        room:rooms(name, rows, columns),
        exam:exams(name, date, start_time, end_time)
      `)
      .eq('exam_id', examId)
      .order('room_id')
      .order('seat_number');
    
    if (error) throw error;
    return data;
  }
};

// Departments API
export const departmentsApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('departments')
      .select('*')
      .order('name');
    
    if (error) throw error;
    return data;
  }
};
