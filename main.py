import os
from fastapi.middleware.cors import CORSMiddleware
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

classes = sqlalchemy.Table(
    "hackathion_classes",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("name", sqlalchemy.String, nullable=False, unique=True),
)

tasks = sqlalchemy.Table(
    "hackathion_tasks",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("name", sqlalchemy.String, nullable=False, unique=True),
    sqlalchemy.Column("code", sqlalchemy.String, nullable=False, unique=True),
    sqlalchemy.Column("data", sqlalchemy.JSON, nullable=False, server_default=sqlalchemy.text("'{}'")),
    sqlalchemy.Column("created_at", sqlalchemy.TIMESTAMP, server_default=sqlalchemy.func.now(), nullable=False),
)

scores = sqlalchemy.Table(
    "hackathion_scores",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("points", sqlalchemy.Integer, nullable=False),
    sqlalchemy.Column("userId", sqlalchemy.Integer, sqlalchemy.ForeignKey("hackathion_users.id"), nullable=False, unique=True),
    sqlalchemy.Column("taskId", sqlalchemy.Integer, sqlalchemy.ForeignKey("hackathion_tasks.id"), nullable=False, unique=True),
)

engine = sqlalchemy.create_engine(DATABASE_URL)
metadata.create_all(engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to your needs
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)

class UserCreate(BaseModel):
    name: constr(max_length=256)
    email: EmailStr
    classId: int

class ScoreUpdate(BaseModel):
    userId: int
    taskId: int
    points: int

class UserClassUpdate(BaseModel):
    userId: int
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

@app.put("/users/class", response_model=UserClassUpdate)
async def update_user_class(user_class_update: UserClassUpdate):
    query = users.update().where(
        users.c.id == user_class_update.userId
    ).values(
        classId=user_class_update.classId
    )
    result = await database.execute(query)

    if result == 0:
        raise HTTPException(status_code=404, detail="User not found")

    return user_class_update

@app.put("/scores/", response_model=ScoreUpdate)
async def update_score(score: ScoreUpdate):
    async with database.transaction():
        query = scores.select().where(
            scores.c.userId == score.userId,
            scores.c.taskId == score.taskId
        )
        existing_score = await database.fetch_one(query)

        if existing_score:
            query = scores.update().where(
                scores.c.userId == score.userId,
                scores.c.taskId == score.taskId
            ).values(
                points=score.points
            )
            await database.execute(query)
        else:
            query = scores.insert().values(
                userId=score.userId,
                taskId=score.taskId,
                points=score.points
            )
            await database.execute(query)

    return score

@app.get("/data/")
async def get_all_data():
    query_users = users.select()
    query_classes = classes.select()
    query_tasks = tasks.select()
    query_scores = scores.select()

    all_users = await database.fetch_all(query_users)
    all_classes = await database.fetch_all(query_classes)
    all_tasks = await database.fetch_all(query_tasks)
    all_scores = await database.fetch_all(query_scores)

    return {
        "users": all_users,
        "classes": all_classes,
        "tasks": all_tasks,
        "scores": all_scores
    }

if __name__ == '__main__':
    import uvicorn

    uvicorn.run(app, host='0.0.0.0', port=8080)
