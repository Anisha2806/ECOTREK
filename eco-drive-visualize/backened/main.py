from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from supabase import create_client, Client
import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# Fetch Supabase credentials
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# Check if they are loaded correctly
if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Missing Supabase credentials! Check .env file or environment variables.")

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Initialize FastAPI app
app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Supabase is configured!"}

# Define request model
class LoginRequest(BaseModel):
    email: EmailStr
    password: str

@app.post("/login")
async def login(user: LoginRequest):
    response = supabase.auth.sign_in_with_password(
        email=user.email, password=user.password
    )

    # Handle Supabase authentication error properly
    if response.get("error"):
        raise HTTPException(status_code=400, detail=response["error"]["message"])

    return {"message": "Login successful", "user": response.get("user")}
