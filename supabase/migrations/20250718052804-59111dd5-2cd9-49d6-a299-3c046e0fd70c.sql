-- Add missing INSERT policy for profiles table
CREATE POLICY "Allow insert for authenticated users" ON profiles
  FOR INSERT 
  WITH CHECK (auth.uid() = id);