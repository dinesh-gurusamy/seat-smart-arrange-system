-- Remove the restrictive INSERT policy that's blocking the trigger
DROP POLICY IF EXISTS "Allow insert for authenticated users" ON profiles;