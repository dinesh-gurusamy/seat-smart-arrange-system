
import { supabase } from '@/integrations/supabase/client';

export interface Student {
  id: string;
  name: string;
  roll_number: string;
  email?: string;
  department_id?: string;
  course_id?: string;
  semester?: number;
  created_at: string;
  department?: { name: string; code: string };
  course?: { name: string; code: string };
}

export const studentsService = {
  async getAll(): Promise<Student[]> {
    const { data, error } = await supabase
      .from('students')
      .select(`
        *,
        department:departments(name, code),
        course:courses(name, code)
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async create(student: Omit<Student, 'id' | 'created_at'>): Promise<Student> {
    const { data, error } = await supabase
      .from('students')
      .insert(student)
      .select(`
        *,
        department:departments(name, code),
        course:courses(name, code)
      `)
      .single();
    
    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<Student>): Promise<Student> {
    const { data, error } = await supabase
      .from('students')
      .update(updates)
      .eq('id', id)
      .select(`
        *,
        department:departments(name, code),
        course:courses(name, code)
      `)
      .single();
    
    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('students')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  async bulkCreate(students: Omit<Student, 'id' | 'created_at'>[]): Promise<Student[]> {
    const { data, error } = await supabase
      .from('students')
      .insert(students)
      .select(`
        *,
        department:departments(name, code),
        course:courses(name, code)
      `);
    
    if (error) throw error;
    return data || [];
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
