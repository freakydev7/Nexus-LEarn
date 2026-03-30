# Smart Student Tools Platform

AI-powered resume analysis and digital time capsules for students.

## Features

- **AI Resume Analyzer** — Upload your resume, get a score (0-100), keyword match analysis, section-by-section feedback, and AI improvement suggestions
- **Digital Time Capsule** — Write messages, attach files, lock them until a future date
- **Dashboard** — Track stats, view activity feed, manage profile
- **Admin Panel** — User management and platform analytics

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Backend | Python, FastAPI |
| Database | SQLite (dev) / PostgreSQL (prod) |
| AI | OpenAI GPT-4o |
| Auth | JWT (python-jose) |

## Quick Start

### Backend

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
copy .env.example .env    # Edit with your settings
uvicorn main:app --reload --port 8000
```

The API will be available at `http://localhost:8000` with Swagger docs at `http://localhost:8000/docs`.

### Frontend

Open `frontend/index.html` in your browser, or use a local server:

```bash
cd frontend
python -m http.server 3000
```

Then visit `http://localhost:3000`.

### API Base URL

Set `API_BASE` in `frontend/js/api.js` to match your backend URL (default: `http://localhost:8000/api`).

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | DB connection string | SQLite file |
| `JWT_SECRET` | Secret for signing tokens | (change this) |
| `JWT_EXPIRE_DAYS` | Token expiry | 7 |
| `OPENAI_API_KEY` | For AI resume analysis | (optional) |
| `MAIL_USERNAME` | SMTP username | (optional) |
| `MAIL_PASSWORD` | SMTP password | (optional) |
| `UPLOAD_DIR` | File upload directory | ./uploads |

## Project Structure

```
smart-student-platform/
├── frontend/
│   ├── index.html           # Landing page
│   ├── login.html            # Login
│   ├── signup.html           # Registration
│   ├── resume-upload.html    # Resume upload
│   ├── resume-result.html    # Analysis results
│   ├── capsule-create.html   # Create capsule
│   ├── capsule-dashboard.html # Capsule list
│   ├── capsule-view.html     # View capsule
│   ├── dashboard.html        # User dashboard
│   ├── css/                  # Stylesheets
│   └── js/                   # JavaScript modules
├── backend/
│   ├── main.py               # FastAPI app
│   ├── config.py             # Settings
│   ├── database.py           # SQLAlchemy setup
│   ├── models/               # DB models
│   ├── schemas/              # Pydantic schemas
│   ├── routers/              # API endpoints
│   ├── services/             # Business logic
│   └── middlewares/          # Auth, CORS
└── database/
    └── init.sql              # PostgreSQL schema
```

## API Endpoints

### Auth
- `POST /api/auth/register` — Create account
- `POST /api/auth/login` — Get JWT token
- `GET /api/auth/me` — Current user

### Resume
- `POST /api/resume/analyze` — Upload + analyze
- `GET /api/resume/history` — Past analyses
- `GET /api/resume/{id}` — Get result
- `DELETE /api/resume/{id}` — Delete

### Capsule
- `POST /api/capsule/create` — Create capsule
- `GET /api/capsule/list` — User's capsules
- `GET /api/capsule/{id}` — View (checks lock)
- `POST /api/capsule/{id}/files` — Upload files
- `GET /api/capsule/public/{id}` — Public view
- `DELETE /api/capsule/{id}` — Delete

### Dashboard
- `GET /api/dashboard/stats` — User stats
- `GET /api/dashboard/activity` — Activity feed
- `PUT /api/dashboard/profile` — Update profile

### Admin
- `GET /api/admin/users` — List users
- `DELETE /api/admin/users/{id}` — Remove user
- `GET /api/admin/analytics` — Platform stats
