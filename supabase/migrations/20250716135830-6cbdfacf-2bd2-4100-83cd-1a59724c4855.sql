
-- Create enum for user roles
CREATE TYPE user_role AS ENUM ('admin', 'faculty', 'student');

-- Create profiles table for user information
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role user_role NOT NULL DEFAULT 'student',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create departments table
CREATE TABLE departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  code TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create courses table
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  code TEXT NOT NULL,
  department_id UUID REFERENCES departments(id) ON DELETE CASCADE,
  semester INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(code, department_id)
);

-- Create exams table
CREATE TABLE exams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create rooms table
CREATE TABLE rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  capacity INTEGER NOT NULL DEFAULT 25,
  rows INTEGER NOT NULL DEFAULT 5,
  columns INTEGER NOT NULL DEFAULT 5,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create students table
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  roll_number TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  email TEXT,
  department_id UUID REFERENCES departments(id),
  course_id UUID REFERENCES courses(id),
  semester INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create seating_plans table
CREATE TABLE seating_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id UUID REFERENCES exams(id) ON DELETE CASCADE,
  student_id UUID REFERENCES students(id),
  room_id UUID REFERENCES rooms(id),
  seat_row INTEGER NOT NULL,
  seat_column INTEGER NOT NULL,
  seat_number INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(exam_id, room_id, seat_row, seat_column),
  UNIQUE(exam_id, student_id)
);

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'student')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE seating_plans ENABLE ROW LEVEL SECURITY;

-- Create security definer function to get user role
CREATE OR REPLACE FUNCTION get_user_role(user_id UUID)
RETURNS user_role AS $$
  SELECT role FROM profiles WHERE id = user_id;
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (get_user_role(auth.uid()) = 'admin');

-- RLS Policies for departments (read-only for all authenticated users)
CREATE POLICY "Authenticated users can view departments" ON departments
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can manage departments" ON departments
  FOR ALL USING (get_user_role(auth.uid()) = 'admin');

-- RLS Policies for courses
CREATE POLICY "Authenticated users can view courses" ON courses
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can manage courses" ON courses
  FOR ALL USING (get_user_role(auth.uid()) = 'admin');

-- RLS Policies for exams
CREATE POLICY "Authenticated users can view exams" ON exams
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins and faculty can manage exams" ON exams
  FOR ALL USING (get_user_role(auth.uid()) IN ('admin', 'faculty'));

-- RLS Policies for rooms
CREATE POLICY "Authenticated users can view rooms" ON rooms
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can manage rooms" ON rooms
  FOR ALL USING (get_user_role(auth.uid()) = 'admin');

-- RLS Policies for students
CREATE POLICY "Authenticated users can view students" ON students
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can manage students" ON students
  FOR ALL USING (get_user_role(auth.uid()) = 'admin');

-- RLS Policies for seating_plans
CREATE POLICY "Users can view seating plans" ON seating_plans
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins and faculty can manage seating plans" ON seating_plans
  FOR ALL USING (get_user_role(auth.uid()) IN ('admin', 'faculty'));

-- Insert some sample data
INSERT INTO departments (name, code) VALUES
  ('Computer Science', 'CS'),
  ('Electronics', 'EC'),
  ('Mechanical', 'ME'),
  ('Civil', 'CE');

INSERT INTO rooms (name, capacity, rows, columns) VALUES
  ('Hall A-101', 25, 5, 5),
  ('Hall A-102', 25, 5, 5),
  ('Hall B-201', 25, 5, 5),
  ('Hall B-202', 25, 5, 5);
