# ReachInbox Backend 🚀

Production-grade email scheduling backend built with Node.js, TypeScript, BullMQ, Redis, Prisma, and Google OAuth.

---

## 🛠 Tech Stack

- **Node.js + TypeScript**
- **Express.js** – REST API
- **BullMQ** – Job queue & delayed scheduling
- **Redis** – Queue persistence & rate limiting
- **Prisma + PostgreSQL** – Database
- **Passport.js (Google OAuth 2.0)** – Authentication
- **JWT** – Stateless auth
- **Nodemailer (Ethereal / Gmail)** – Email sending

---

## 📦 Features Implemented

### ✅ Backend Features
- Google OAuth login (real, no mock)
- JWT-based authentication
- Email scheduling with future timestamps
- Persistent jobs (survive server restarts)
- Rate limiting (hourly limits)
- Controlled concurrency (safe parallel sends)
- CSV/Text email parsing
- Email status tracking (scheduled / sent / failed)

---

## 🧱 Architecture Overview

### 🔁 How Scheduling Works
1. User schedules emails via frontend
2. Backend saves jobs in **PostgreSQL**
3. Jobs are pushed to **BullMQ**
4. BullMQ delays execution until scheduled time
5. Worker sends emails using Nodemailer

### ♻️ Persistence on Restart
- BullMQ stores jobs in Redis
- Prisma stores job metadata in DB
- On server restart, jobs resume automatically

### 🚦 Rate Limiting & Concurrency
- Redis-based limiter
- Hourly cap enforced per user
- BullMQ concurrency controls email throughput

---

## ⚙️ Environment Variables

Create a `.env` file inside `backend/`

```env
PORT=5000
FRONTEND_URL=https://reachinbox-frontend-n3dd.onrender.com
BACKEND_URL=https://reachinbox-sde-intern-assignment.onrender.com

DATABASE_URL=postgresql://user:password@host:5432/db
REDIS_URL=redis://localhost:6379

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=https://reachinbox-sde-intern-assignment.onrender.com/api/auth/google/callback

JWT_SECRET=supersecretkey

GMAIL_USER=your_email@gmail.com
GMAIL_APP_PASSWORD=your_app_password

📧 Ethereal Email Setup (for testing)

Visit https://ethereal.email

Create a test account

Copy credentials into .env

Emails can be previewed without real delivery

▶️ How to Run Backend Locally
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run build
npm start

Backend runs on:

http://localhost:5000

🔌 API Endpoints

GET /api/auth/google
GET /api/auth/google/callback
GET /api/auth/me
POST /api/schedule
GET /api/schedule/scheduled
GET /api/schedule/sent
✅ Production Ready
Restart-safe
Horizontally scalable
Queue-based architecture
Real OAuth & Email delivery

---

Commit the file (RIGHT SIDE)
On the right: https://reachinbox-sde-intern-assignment.onrender.com
- **Commit message**:
add backend README
Click **Commit changes**
 Backend README is DONE.
