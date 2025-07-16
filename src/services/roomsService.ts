
import { supabase } from '@/integrations/supabase/client';

export interface Room {
  id: string;
  name: string;
  capacity: number;
  rows: number;
  columns: number;
  is_active: boolean;
  created_at: string;
}

export const roomsService = {
  async getAll(): Promise<Room[]> {
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .order('name');
    
    if (error) throw error;
    return data || [];
  },

  async create(room: Omit<Room, 'id' | 'created_at'>): Promise<Room> {
    const roomData = {
      ...room,
      capacity: room.rows * room.columns
    };
    
    const { data, error } = await supabase
      .from('rooms')
      .insert(roomData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<Room>): Promise<Room> {
    const updateData = { ...updates };
    
    // Recalculate capacity if rows or columns changed
    if (updates.rows || updates.columns) {
      const { data: currentRoom } = await supabase
        .from('rooms')
        .select('rows, columns')
        .eq('id', id)
        .single();
      
      if (currentRoom) {
        const rows = updates.rows || currentRoom.rows;
        const columns = updates.columns || currentRoom.columns;
        updateData.capacity = rows * columns;
      }
    }
    
    const { data, error } = await supabase
      .from('rooms')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('rooms')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  async toggleActive(id: string): Promise<Room> {
    const { data: room, error: fetchError } = await supabase
      .from('rooms')
      .select('is_active')
      .eq('id', id)
      .single();
    
    if (fetchError) throw fetchError;
    
    const { data, error } = await supabase
      .from('rooms')
      .update({ is_active: !room.is_active })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};
