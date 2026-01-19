# ReachInbox SDE Intern Assignment - Full-Stack Email Job Scheduler

## 🚀 Overview
A production-grade email scheduling service and dashboard built to handle reliable outreach at scale. [cite_start]This system utilizes a persistent Redis-backed job queue to manage email delivery with strict rate limiting and concurrency controls[cite: 12, 13, 16].

## 🛠️ Tech Stack
- [cite_start]**Frontend**: React.js, TypeScript, Custom CSS (ReachInbox Dark/Light Theme) [cite: 31, 32, 33]
- [cite_start]**Backend**: Node.js, TypeScript, Express.js [cite: 25, 26, 28]
- [cite_start]**Queue**: BullMQ with Redis (Job persistence and delayed execution) [cite: 16, 29]
- [cite_start]**Database**: PostgreSQL with Prisma ORM 
- [cite_start]**SMTP**: Ethereal Email (Fake SMTP for testing) [cite: 17, 30]

## [cite_start]✨ Key Features Implemented [cite: 170, 171]
### Backend
- [cite_start]**Core Scheduler**: Uses BullMQ delayed jobs (No Cron) to ensure persistence across server restarts[cite: 42, 77, 86].
- [cite_start]**Rate Limiting**: Enforces a configurable `MAX_EMAILS_PER_HOUR` (default 200) using Redis-backed counters[cite: 58, 59, 63].
- [cite_start]**Throttling**: Implements a minimum 2-second delay between individual email sends to mimic real-world provider behavior[cite: 52, 56].
- [cite_start]**Concurrency**: Configurable worker concurrency levels to handle 1000+ simultaneous jobs safely[cite: 49, 50, 73].

### Frontend
- [cite_start]**Google OAuth**: Full Google Login implementation with session persistence[cite: 94, 95].
- [cite_start]**Main Dashboard**: Clean, organized UI showing Scheduled vs. Sent emails with status badges[cite: 102, 105, 128].
- [cite_start]**Compose System**: Supports subject/body entry, start time scheduling, and CSV/Text lead file parsing[cite: 112, 118, 120].

## [cite_start]🏗️ Architecture [cite: 166]
The system follows a producer-consumer architecture:
1. [cite_start]**Producer (API)**: Receives a request, saves the email to the DB, and adds a delayed job to BullMQ[cite: 40, 42].
2. [cite_start]**Queue (Redis)**: Holds the job metadata and manages the delay[cite: 29].
3. [cite_start]**Consumer (Worker)**: Picks up jobs, checks rate limits, sends via Ethereal SMTP, and updates DB status[cite: 43, 63, 144].



## [cite_start]🚦 How to Run [cite: 163, 164, 165]
### Prerequisites
- Redis Server (Port 6379)
- PostgreSQL Instance

### 1. Backend Setup
```bash
cd backend
npm install
# Configure .env with GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, DATABASE_URL, and REDIS_HOST
npx prisma db push
npm run dev
