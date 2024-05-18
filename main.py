import os

import databases
import sqlalchemy
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, constr, EmailStr

load_dotenv()

DATABASE_URL = os.getenv('POSTGRES_URL_NO_SSL').replace('postgres', 'postgresql')

database = databases.Database(DATABASE_URL)
metadata = sqlalchemy.MetaData()

users = sqlalchemy.Table(
    "hackathion_users",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("name", sqlalchemy.String, nullable=False, unique=True),
    sqlalchemy.Column("email", sqlalchemy.String, unique=True),
    sqlalchemy.Column("classId", sqlalchemy.Integer),
    sqlalchemy.Column("created_at", sqlalchemy.TIMESTAMP, server_default=sqlalchemy.func.now(), nullable=False),
)

engine = sqlalchemy.create_engine(DATABASE_URL)
metadata.create_all(engine)

app = FastAPI()


class UserCreate(BaseModel):
    name: constr(max_length=256)
    email: EmailStr
    classId: int


@app.on_event("startup")
async def startup():
    await database.connect()


@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()


@app.post("/users/", response_model=UserCreate)
async def create_user(user: UserCreate):
    query = users.insert().values(
        name=user.name,
        email=user.email,
        classId=user.classId
    )
    try:
        last_record_id = await database.execute(query)
        return {**user.dict(), "id": last_record_id}
    except sqlalchemy.exc.IntegrityError:
        raise HTTPException(status_code=400, detail="User with this name or email already exists.")


if __name__ == '__main__':
    import uvicorn

    uvicorn.run(app, host='127.0.0.1', port=8080)
