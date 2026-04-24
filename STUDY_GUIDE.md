# Study Guide: Role-Based Task Manager

This guide is designed to help you understand the project from zero, in the right order, without getting overwhelmed.

## 1. Project Overview

### What this project is solving

This project solves a common team workflow problem:
- Teams need a simple way to create, assign, and track tasks.
- Not everyone should have the same permissions.

So this app introduces role-based behavior:
- Manager can create and assign tasks.
- Member can view assigned tasks and update task status.

It is a practical mini system to learn:
- Authentication
- Authorization (role-based access)
- API design
- Frontend-backend integration

### High-level architecture

The project has two parts:

- Frontend (React + Vite + Tailwind + Axios)
  - Handles screens, forms, routing, and API calls.
- Backend (FastAPI + SQLAlchemy + PostgreSQL + JWT)
  - Handles business logic, database operations, authentication, and authorization.

Think of it like this:
- Frontend = what user sees and clicks
- Backend = rules, data, security

## 2. How to Start Understanding the Backend

Read backend files in this exact order:

1. main.py
- Understand how FastAPI app starts and where routes are attached.

2. database.py
- See how SQLAlchemy connects to PostgreSQL and creates DB session utilities.

3. models.py
- Understand table structures (User and Task).

4. auth.py
- Learn password hashing, JWT creation, and token verification.

5. routes.py
- See actual APIs and role-based rules in action.

Why this order works:
- App bootstrapping first
- Data layer next
- Data models next
- Security layer next
- Feature APIs last

## 3. Backend Learning Flow (Step-by-step)

### Step 1: How server starts

In main.py:
- FastAPI app object is created.
- CORS middleware is enabled so frontend can call backend.
- DB tables are initialized using Base.metadata.create_all.
- Router from routes.py is included.

Result:
- Server starts and all endpoints become available.

### Step 2: How DB connects

In database.py:
- DATABASE_URL points to PostgreSQL.
- create_engine creates SQLAlchemy engine.
- SessionLocal creates per-request DB sessions.
- Base is used by all models.

Result:
- App can open DB sessions and run queries.

### Step 3: How models are defined

In models.py:
- User model stores id, name, email, password, role.
- Task model stores id, title, description, status, assigned_to, created_by.

Result:
- You know exactly what data shape is stored in DB.

### Step 4: How authentication works

In auth.py:
- Password is hashed with passlib + bcrypt.
- Login creates JWT token with user id and role.
- get_user dependency verifies token and returns payload.

Result:
- Protected APIs can trust identity and role from JWT.

### Step 5: How APIs are structured

In routes.py:
- APIRouter groups all endpoints.
- Pydantic schemas validate request bodies.
- DB session is injected using Depends.
- Protected routes use get_user dependency.

Result:
- Clean and modular route logic.

### Step 6: How role-based access is enforced

In routes.py:
- POST /tasks checks user role must be manager.
- GET /tasks returns all tasks for manager, filtered tasks for member.
- PUT /tasks/{task_id} allows member update only for assigned task.

Result:
- Authorization rules are enforced in backend, not only frontend.

## 4. Backend Functional Flow

### Register flow

1. Frontend sends name, email, password, role.
2. Backend checks if email already exists.
3. Password is hashed.
4. User is stored in users table.
5. Success message is returned.

### Login flow

1. Frontend sends email and password.
2. Backend finds user by email.
3. Password is verified against hashed password.
4. JWT is generated with id and role.
5. Token is returned.

### Create task flow

1. Manager frontend sends title, description, assigned_to.
2. JWT is sent in Authorization header.
3. Backend verifies JWT and role.
4. If role is manager, task is inserted.
5. Success response is returned.

### View task flow

1. Frontend calls GET /tasks with JWT.
2. Backend checks role from token payload.
3. Manager gets all tasks.
4. Member gets only tasks where assigned_to equals member id.
5. Task list is returned.

### Update task flow

1. Member clicks complete.
2. Frontend calls PUT /tasks/{id} with status update.
3. Backend checks task existence.
4. Backend verifies member owns that task.
5. Status is updated and success returned.

## 5. How to Understand the Frontend

Read frontend files in this order:

1. App.jsx
- This is the routing entry point.

2. Routing setup
- See routes to Login, Register, Dashboard pages.

3. Pages in order
- Login page
- Register page
- Dashboard page

4. Components
- TaskCard for displaying and updating a task
- CreateTask for manager task creation form

This order helps you go from top-level flow to page details to reusable UI pieces.

## 6. Frontend Flow

### Login and token storage

- User logs in from Login page.
- Frontend receives access_token.
- Token is stored in localStorage.

### Decode token

- Dashboard reads token from localStorage.
- Token payload is decoded to get role and id.

### Fetch tasks

- Dashboard sends GET /tasks with Bearer token.
- Tasks are stored in component state.
- UI renders task list.

### Role-based rendering

- If role is manager, show CreateTask component.
- If role is member, show Complete button in TaskCard.

Important idea:
- Frontend controls what user sees.
- Backend controls what user is allowed to do.

## 7. Full Project Flow (End-to-End)

1. User registers as manager or member.
2. User logs in and receives JWT.
3. Frontend stores token.
4. Frontend sends token in protected API calls.
5. Backend verifies token and extracts role/id.
6. Backend applies role-based rules.
7. DB is queried or updated.
8. Response is returned to frontend.
9. UI updates based on response and role.

You can remember this as:
- Auth → Token → Protected API → Role Check → DB → UI Update

## 8. Recommended Learning Path

### What to study first

1. FastAPI basics: routing, Depends, Pydantic
2. SQLAlchemy basics: models, sessions, queries
3. JWT basics: encode/decode, bearer auth
4. React basics: useState, useEffect, routing
5. Axios basics: API calls and headers

### What to modify next (good practice tasks)

- Add input validation (empty fields, email format).
- Add proper error messages on all forms.
- Add logout flow and route protection.
- Replace window reload patterns with state updates.

### How to extend the project

- Add task priorities and due dates.
- Add task filters (pending/completed).
- Add pagination for long task lists.
- Add manager verification step before final completion.
- Add refresh tokens and stronger auth handling.

## 9. Tips for Beginners

### Common mistakes

- Forgetting to send Authorization header.
- Decoding token when token is missing or expired.
- Assuming frontend role checks are enough (they are not).
- Not hashing passwords.
- Hardcoding secrets in code.
- Sending incomplete JSON payloads (causes 422 errors).

### Debugging tips

- Check backend server logs first for exact error.
- Use browser network tab to inspect request body and headers.
- Confirm token format is Bearer <token>.
- Test APIs quickly with Postman or curl before UI debugging.
- Print decoded JWT payload during development.
- Verify DB records directly when results look wrong.

## Final Advice

Study this project in layers:
1. Structure first
2. Data flow second
3. Security rules third
4. UI behavior last

If you follow the file order and flow above, the entire project will make sense much faster.