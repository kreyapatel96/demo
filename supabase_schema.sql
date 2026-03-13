-- Create the analyses table
CREATE TABLE analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  tool TEXT NOT NULL,
  input_text TEXT NOT NULL,
  ai_response TEXT NOT NULL,
  model_used TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE analyses ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow users to insert their own data
CREATE POLICY "Users can insert their own analyses" 
ON analyses FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Allow users to view only their own data
CREATE POLICY "Users can view their own analyses" 
ON analyses FOR SELECT 
USING (auth.uid() = user_id);

-- Allow users to delete their own data
CREATE POLICY "Users can delete their own analyses" 
ON analyses FOR DELETE 
USING (auth.uid() = user_id);
