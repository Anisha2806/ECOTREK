from dotenv import load_dotenv
import os

load_dotenv()  # or load_dotenv(".env")
print("SUPABASE_URL:", os.getenv("SUPABASE_URL"))
print("SUPABASE_KEY:", os.getenv("SUPABASE_KEY"))
