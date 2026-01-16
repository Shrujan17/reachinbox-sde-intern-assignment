# ReachInbox SDE Intern Assignment

## Overview
This project implements a production-style email scheduling system similar to ReachInbox’s backend architecture.
Emails can be scheduled for future delivery using a persistent Redis-backed job queue without cron jobs.

## Tech Stack
- Node.js
- TypeScript
- Express
- BullMQ
- Redis (Memurai – Redis 7.x)
- Nodemailer (Ethereal Email)

## Architecture
- Express API receives scheduling requests
- BullMQ stores delayed email jobs in Redis
- Background worker processes jobs and sends emails
- Redis persistence ensures restart safety

## Key Features
- Delayed email scheduling
- Restart-safe job processing
- Redis-based queue (no cron)
- Clean separation of API, queue, and worker

## How to Run
```bash
cd backend
npm install
npx ts-node-dev src/index.ts
npx ts-node-dev src/workers/emailWorker.ts
