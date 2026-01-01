
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://cmdfvzsspegajtycozxf.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtZGZ2enNzcGVnYWp0eWNvenhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwNDQ2MzAsImV4cCI6MjA1ODYyMDYzMH0.0sK5gYYhNYo0N8Fy1VckACK_V9lPlurnUc1XxTjhC0Y";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
