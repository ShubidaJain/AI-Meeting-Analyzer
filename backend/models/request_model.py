from sqlalchemy import Column, Integer, String
from database import Base

# 👤 USER TABLE
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)


# 📊 RESULT TABLE (ADD THIS)
class Result(Base):
    __tablename__ = "results"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    input_text = Column(String)
    output = Column(String)