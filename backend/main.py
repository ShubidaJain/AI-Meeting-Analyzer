from fastapi import FastAPI
from pydantic import BaseModel
from crew import run_workflow
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS for React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Temporary storage (in-memory)
users = []
history = []

# Models
class UserAuth(BaseModel):
    email: str
    password: str

class InputText(BaseModel):
    text: str

# Signup
@app.post("/signup")
def signup(data: UserAuth):
    users.append({
        "email": data.email,
        "password": data.password
    })
    return {"msg": "User created"}

# Login
@app.post("/login")
def login(data: UserAuth):
    for user in users:
        if user["email"] == data.email and user["password"] == data.password:
            return {"msg": "Login successful"}
    return {"error": "Invalid credentials"}

# Run AI
@app.post("/run")
def run_ai(data: InputText):
    result = run_workflow(data.text)

    history.append({
        "input": data.text,
        "output": result
    })

    return {"result": result}

# Get history
@app.get("/history")
def get_history():
    return history