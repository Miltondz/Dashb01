/*
  # Initial Schema Setup

  1. Tables Created
    - profiles
      - id (uuid, primary key, references auth.users)
      - username (text, unique)
      - full_name (text)
      - avatar_url (text)
      - updated_at (timestamp with time zone)
      - created_at (timestamp with time zone)
    - dashboards
      - id (uuid, primary key)
      - title (text)
      - description (text)
      - owner_id (uuid, references auth.users)
      - is_public (boolean)
      - created_at (timestamp with time zone)
      - updated_at (timestamp with time zone)
    - dashboard_components
      - id (uuid, primary key)
      - dashboard_id (uuid, references dashboards)
      - type (text)
      - content (text)
      - file_path (text)
      - position_x (integer)
      - position_y (integer)
      - width (integer)
      - height (integer)
      - language (text)
      - created_at (timestamp with time zone)
      - updated_at (timestamp with time zone)
    - dashboard_shares
      - id (uuid, primary key)
      - dashboard_id (uuid, references dashboards)
      - user_id (uuid, references auth.users)
      - access_level (text)
      - created_at (timestamp with time zone)

  2. Security
    - RLS enabled on all tables
    - Policies created for each table
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
    id UUID REFERENCES auth.users PRIMARY KEY,
    username TEXT UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    updated_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Dashboards table
CREATE TABLE IF NOT EXISTS dashboards (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    owner_id UUID REFERENCES auth.users NOT NULL,
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMP WITH TIME ZONE
);

-- Dashboard components table
CREATE TABLE IF NOT EXISTS dashboard_components (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    dashboard_id UUID REFERENCES dashboards ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('note', 'code', 'image')),
    content TEXT,
    file_path TEXT,
    position_x INTEGER,
    position_y INTEGER,
    width INTEGER,
    height INTEGER,
    language TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMP WITH TIME ZONE
);

-- Dashboard sharing table
CREATE TABLE IF NOT EXISTS dashboard_shares (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    dashboard_id UUID REFERENCES dashboards ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users,
    access_level TEXT CHECK (access_level IN ('view', 'edit')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE dashboards ENABLE ROW LEVEL SECURITY;
ALTER TABLE dashboard_components ENABLE ROW LEVEL SECURITY;
ALTER TABLE dashboard_shares ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
    ON profiles FOR SELECT
    USING (true);

CREATE POLICY "Users can update own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id);

-- Dashboards policies
CREATE POLICY "Users can view own dashboards"
    ON dashboards FOR SELECT
    USING (auth.uid() = owner_id);

CREATE POLICY "Users can view shared dashboards"
    ON dashboards FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM dashboard_shares
            WHERE dashboard_id = dashboards.id
            AND user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create dashboards"
    ON dashboards FOR INSERT
    WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update own dashboards"
    ON dashboards FOR UPDATE
    USING (auth.uid() = owner_id);

CREATE POLICY "Users can delete own dashboards"
    ON dashboards FOR DELETE
    USING (auth.uid() = owner_id);