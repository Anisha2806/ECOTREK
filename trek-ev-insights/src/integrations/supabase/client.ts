import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Supabase Project 1
const SUPABASE_URL_1 = "https://erhzxzjwhaongbtrcyib.supabase.co";
const SUPABASE_KEY_1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVyaHp4emp3aGFvbmdidHJjeWliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwMDM5MzAsImV4cCI6MjA1ODU3OTkzMH0.2O5_bBtaCOQjVYC-MSxTKP3CZJ4J7Z1_OeSN4mS31Ko";

// Supabase Project 2
const SUPABASE_URL_2 = "https://cmdfvzsspegajtycozxf.supabase.co";
const SUPABASE_KEY_2 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtZGZ2enNzcGVnYWp0eWNvenhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwNDQ2MzAsImV4cCI6MjA1ODYyMDYzMH0.0sK5gYYhNYo0N8Fy1VckACK_V9lPlurnUc1XxTjhC0Y";

// Create separate Supabase clients
export const supabase1 = createClient<Database>(SUPABASE_URL_1, SUPABASE_KEY_1);
export const supabase2 = createClient<Database>(SUPABASE_URL_2, SUPABASE_KEY_2);
