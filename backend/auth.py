from passlib.context import CryptContext
from jose import jwt
import datetime

SECRET_KEY = "secret123"

def decode_token(token):
    return jwt.decode(token, SECRET_KEY, algorithms=["HS256"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password):
    return pwd_context.hash(password)

def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)

def create_token(data):
    return jwt.encode(
        {**data, "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)},
        SECRET_KEY,
        algorithm="HS256"
    )