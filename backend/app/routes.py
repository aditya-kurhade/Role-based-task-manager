from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models import User, Task
from app.schemas import Register, Login, TaskCreate, TaskUpdate
from app.auth import hash_pass, verify_pass, create_token, get_user

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ✅ REGISTER (FIXED)
@router.post("/auth/register")
def register(data: Register, db: Session = Depends(get_db)):

    existing = db.query(User).filter(User.email == data.email).first()
    if existing:
        raise HTTPException(400, "Email already exists")

    user = User(
        name=data.name,
        email=data.email,
        password=hash_pass(data.password),  # 🔥 IMPORTANT FIX
        role=data.role
    )

    db.add(user)
    db.commit()

    return {"msg": "User created"}


# ✅ LOGIN (FIXED)
@router.post("/auth/login")
def login(data: Login, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.email == data.email).first()

    if not user:
        raise HTTPException(401, "User not found")

    if not verify_pass(data.password, user.password):
        raise HTTPException(401, "Wrong password")

    token = create_token({
        "id": user.id,
        "role": user.role
    })

    return {"access_token": token}


# ✅ CREATE TASK
@router.post("/tasks")
def create_task(data: TaskCreate,
                db: Session = Depends(get_db),
                user=Depends(get_user)):

    if user["role"] != "manager":
        raise HTTPException(403, "Only manager can create")

    task = Task(
        title=data.title,
        description=data.description,
        assigned_to=data.assigned_to,
        created_by=user["id"]
    )

    db.add(task)
    db.commit()

    return {"msg": "Task created"}


# ✅ GET TASKS
@router.get("/tasks")
def get_tasks(db: Session = Depends(get_db),
              user=Depends(get_user)):

    if user["role"] == "manager":
        return db.query(Task).all()

    return db.query(Task).filter(Task.assigned_to == user["id"]).all()


# ✅ UPDATE TASK
@router.put("/tasks/{task_id}")
def update_task(task_id: int,
                data: TaskUpdate,
                db: Session = Depends(get_db),
                user=Depends(get_user)):

    task = db.query(Task).filter(Task.id == task_id).first()

    if not task:
        raise HTTPException(404, "Task not found")

    if user["role"] == "member" and task.assigned_to != user["id"]:
        raise HTTPException(403, "Not your task")

    task.status = data.status
    db.commit()

    return {"msg": "Updated"}