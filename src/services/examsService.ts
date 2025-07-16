
import { supabase } from '@/integrations/supabase/client';

export interface Exam {
  id: string;
  name: string;
  date: string;
  start_time: string;
  end_time: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export const examsService = {
  async getAll(): Promise<Exam[]> {
    const { data, error } = await supabase
      .from('exams')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async create(exam: Omit<Exam, 'id' | 'created_at' | 'updated_at'>): Promise<Exam> {
    const { data, error } = await supabase
      .from('exams')
      .insert({
        ...exam,
        created_by: (await supabase.auth.getUser()).data.user?.id
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<Exam>): Promise<Exam> {
    const { data, error } = await supabase
      .from('exams')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('exams')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  async getUpcoming(): Promise<Exam[]> {
    const today = new Date().toISOString().split('T')[0];
    
    const { data, error } = await supabase
      .from('exams')
      .select('*')
      .gte('date', today)
      .order('date');
    
    if (error) throw error;
    return data || [];
  }
};
