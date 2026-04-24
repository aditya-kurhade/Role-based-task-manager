from sqlalchemy import Column, Integer, String, ForeignKey
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    email = Column(String(100), unique=True)
    password = Column(String(255))
    role = Column(String(20))


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True)
    title = Column(String(100))
    description = Column(String(255))
    status = Column(String(20), default="pending")
    assigned_to = Column(Integer, ForeignKey("users.id"))
    created_by = Column(Integer)