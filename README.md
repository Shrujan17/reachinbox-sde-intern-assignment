# ReachInbox SDE Intern Assignment - Full-Stack Email Job Scheduler

## 🚀 Overview
A production-grade email scheduling service and dashboard built to handle reliable outreach at scale[cite: 13]. [cite_start]This system utilizes a persistent Redis-backed job queue to manage email delivery with strict rate limiting and concurrency controls[cite: 16, 46].

## 🛠️ Tech Stack
- **Frontend**: React.js, TypeScript, Custom CSS (ReachInbox Clean Light/Dark Theme)[cite: 31, 32, 33].
- **Backend**: Node.js, TypeScript, Express.js[cite: 25, 26, 28].
- **Queue**: BullMQ with Redis (Job persistence and delayed execution)[cite: 29, 82].
- **Database**: PostgreSQL with Prisma ORM[cite: 30].
- **SMTP**: Ethereal Email (Fake SMTP for testing)[cite: 17, 30].

## ✨ Key Features Implemented [cite: 170, 171]

### Backend Requirements
- **Core Scheduler**: Uses BullMQ delayed jobs (No Cron) to ensure persistence across server restarts[cite: 42, 77, 86].
- **Rate Limiting**: Enforces a configurable `MAX_EMAILS_PER_HOUR` (default 200) using Redis-backed counters[cite: 58, 59, 63].
- **Throttling**: Implements a minimum 2-second delay between individual email sends to mimic provider behavior[cite: 52, 56].
- **Concurrency**: Configurable worker concurrency levels to handle 1000+ simultaneous jobs safely[cite: 49, 50, 73].
- **Persistence**: Survives server restarts; future emails are still sent at the correct time without duplication[cite: 18, 44, 45].

### Frontend Requirements
- **Google OAuth**: Full Google Login implementation with session persistence[cite: 94, 95].
- **Main Dashboard**: Clean, organized UI showing Scheduled vs. Sent emails with status badges[cite: 102, 105, 128].
- **Compose System**: Supports subject/body entry, start time scheduling, and CSV/Text lead file parsing[cite: 112, 118, 120].

## 🏗️ Architecture 
The system follows a producer-consumer architecture:
1. **Producer (API)**: Receives a request, saves the email to the DB, and adds a delayed job to BullMQ[cite: 40, 42].
2. **Queue (Redis)**: Holds the job metadata and manages the delay[cite: 29].
3. **Consumer (Worker)**: Picks up jobs, checks rate limits, sends via Ethereal SMTP, and updates DB status[cite: 43, 63, 144].



## 🚦 How to Run [cite: 163, 164, 165]

### Prerequisites
- Redis Server (Port 6379)[cite: 35].
- PostgreSQL Instance[cite: 35].

### 1. Backend Setup
```bash
cd backend
npm install
# Configure .env with GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, DATABASE_URL, and REDIS_HOST
npx prisma db push
npm run dev
