from pydantic import BaseModel

# auth
class Register(BaseModel):
    name: str
    email: str
    password: str
    role: str

class Login(BaseModel):
    email: str
    password: str

# task
class TaskCreate(BaseModel):
    title: str
    description: str
    assigned_to: int

class TaskUpdate(BaseModel):
    status: str