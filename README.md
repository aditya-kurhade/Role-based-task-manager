# Role-Based Task Manager

A full-stack task management application where users can register, log in, and work with tasks based on their role.

This project has two roles:
- Manager: can create tasks and assign them to team members.
- Member: can view tasks assigned to them and update task status.

It is built with a FastAPI backend and a React frontend, with JWT-based authentication for protected APIs.

## Features

- User authentication
  - Register with name, email, password, and role
  - Login and receive JWT access token
- Role-based access control
  - Manager-only access for task creation
  - Member access for updating assigned task status
- Task creation (Manager)
  - Create task with title, description, and assignee user ID
- Task assignment
  - Assign tasks to a specific member by user ID
- Task viewing
  - Manager sees all tasks
  - Member sees only tasks assigned to them
- Task status update (Member)
  - Member marks assigned tasks as completed

## Tech Stack

### Backend
- Python
- FastAPI
- SQLAlchemy
- PostgreSQL
- JWT Authentication (PyJWT)
- Passlib + bcrypt (password hashing)
- Uvicorn

### Frontend
- React (Vite)
- React Router
- Tailwind CSS
- Axios

## Folder Structure

```text
Role-based-task-manager/
├─ backend/
│  ├─ app/
│  │  ├─ auth.py
│  │  ├─ database.py
│  │  ├─ main.py
│  │  ├─ models.py
│  │  ├─ routes.py
│  │  └─ schemas.py
│  ├─ requirements.txt
│  └─ venv/
└─ frontend/
   ├─ public/
   ├─ src/
   │  ├─ components/
   │  │  ├─ CreateTask.jsx
   │  │  └─ TaskCard.jsx
   │  ├─ pages/
   │  │  ├─ Dashboard.jsx
   │  │  ├─ Login.jsx
   │  │  └─ Register.jsx
   │  ├─ api.js
   │  ├─ App.jsx
   │  └─ main.jsx
   ├─ package.json
   └─ vite.config.js
```

## Installation Guide (Step-by-step)

### 1) Clone the repository

```bash
git clone <your-repo-url>
cd Role-based-task-manager
```

### 2) Backend setup

Move to backend folder:

```bash
cd backend
```

Create virtual environment:

```bash
python -m venv venv
```

Activate virtual environment:

Windows (PowerShell):

```bash
.\venv\Scripts\Activate.ps1
```

macOS/Linux:

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run backend server:

```bash
uvicorn app.main:app --reload
```

Backend runs on:

```text
http://localhost:8000
```

### 3) Frontend setup

Open a new terminal and move to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run frontend dev server:

```bash
npm run dev
```

Frontend typically runs on:

```text
http://localhost:5173
```

## Environment Setup

This project uses PostgreSQL and JWT.

### PostgreSQL configuration

Current project code stores database URL directly in backend/app/database.py.
For a production-ready setup, move it to environment variables.

Recommended .env values:

```env
DATABASE_URL=postgresql://username:password@host:5432/db_name
JWT_SECRET=your_super_secret_key
JWT_ALGORITHM=HS256
```

Then load these in backend code (for example using python-dotenv).

### JWT secret setup

Current project code stores JWT secret directly in backend/app/auth.py.
For better security, use JWT_SECRET from environment variables and never commit secrets to source control.

## API Endpoints

Base URL:

```text
http://localhost:8000
```

### Authentication APIs

- POST /auth/register
  - Purpose: Register a new user
  - Access: Public
- POST /auth/login
  - Purpose: Login user and return JWT token
  - Access: Public

### Task APIs

- POST /tasks
  - Purpose: Create a new task
  - Access: Manager only
  - Requires: Bearer token
- GET /tasks
  - Purpose: Fetch tasks
  - Access: Authenticated user
  - Behavior:
    - Manager gets all tasks
    - Member gets only assigned tasks
- PUT /tasks/{task_id}
  - Purpose: Update task status
  - Access: Authenticated user (restricted by assignment rules)
  - Requires: Bearer token

### Example request/response

#### Register

Request:

```http
POST /auth/register
Content-Type: application/json

{
  "name": "Alice",
  "email": "alice@example.com",
  "password": "123456",
  "role": "manager"
}
```

Response:

```json
{
  "msg": "User created"
}
```

#### Login

Request:

```http
POST /auth/login
Content-Type: application/json

{
  "email": "alice@example.com",
  "password": "123456"
}
```

Response:

```json
{
  "access_token": "<jwt_token_here>"
}
```

#### Create Task (Manager)

Request:

```http
POST /tasks
Authorization: Bearer <jwt_token_here>
Content-Type: application/json

{
  "title": "Prepare weekly report",
  "description": "Collect and submit team metrics",
  "assigned_to": 2
}
```

Response:

```json
{
  "msg": "Task created"
}
```

#### Update Task Status (Member)

Request:

```http
PUT /tasks/1
Authorization: Bearer <jwt_token_here>
Content-Type: application/json

{
  "status": "COMPLETED"
}
```

Response:

```json
{
  "msg": "Updated"
}
```

## How Role-Based Access Works

After login, JWT token contains user id and role.

- Manager behavior
  - Can create tasks
  - Can view all tasks
- Member behavior
  - Cannot create tasks
  - Can view only tasks assigned to them
  - Can update status only for tasks assigned to them

Backend checks role and user identity on protected routes before allowing actions.

## Screenshots

Add screenshots here after UI is finalized.

- Login Page
  - ![Login Screenshot](./docs/screenshots/login-placeholder.png)
- Register Page
  - ![Register Screenshot](./docs/screenshots/register-placeholder.png)
- Dashboard (Manager)
  - ![Manager Dashboard Screenshot](./docs/screenshots/manager-dashboard-placeholder.png)
- Dashboard (Member)
  - ![Member Dashboard Screenshot](./docs/screenshots/member-dashboard-placeholder.png)

## Future Improvements

- Add pagination for task lists
- Improve overall UI/UX with better responsive design
- Add task verification flow (for example manager approval after member completion)

## Author

Created by Your Name.

If you are using this project for learning, feel free to fork and customize it.
