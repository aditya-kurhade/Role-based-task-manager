from passlib.context import CryptContext
import jwt
from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer

SECRET = "secret"
ALGORITHM = "HS256"

pwd = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()


def hash_pass(password: str):
    password = password[:72]   
    return pwd.hash(password)


def verify_pass(plain, hashed):
    plain = plain[:72]  
    return pwd.verify(plain, hashed)


def create_token(data: dict):
    return jwt.encode(data, SECRET, algorithm=ALGORITHM)


def get_user(token=Depends(security)):
    try:
        return jwt.decode(token.credentials, SECRET, algorithms=[ALGORITHM])
    except:
        raise HTTPException(401, "Invalid token")