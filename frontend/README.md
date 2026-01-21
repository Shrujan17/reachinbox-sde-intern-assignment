# ReachInbox Frontend 

Modern, responsive frontend for the ReachInbox email scheduling platform.  
Built with React, TypeScript, and Vite, integrated with real Google OAuth and a production-grade backend.
---

Tech Stack

- **React + TypeScript**
- **Vite** – Fast build tool
- **Axios** – API communication
- **CSS (Custom Theme)** – Dark, modern UI
- **Google OAuth (via Backend Redirect)**
- **JWT** – Auth token handling
---

Features Implemented

Authentication
- Real Google OAuth login (no mock)
- Secure redirect-based login flow
- JWT token handling
- Auto-login using stored token
- Logout functionality

Dashboard
- User info in header:
  - Name
  - Email
  - Avatar
- Sticky top header
- Clean, modern layout matching Figma intent

Email Management
- Tabs:
  - Scheduled Emails
  - Sent Emails
- Dynamic tables with:
  - Email
  - Subject
  - Time
  - Status
- Loading states
- Empty states

Compose New Email
- Modal-based compose flow
- Subject & body input
- CSV / text file upload for leads
- Email count detection
- Scheduling controls:
  - Start time
  - Delay between emails
  - Hourly limit
- Submit data to backend scheduler API
---

UI / UX Highlights

- Dark premium theme
- Gradient primary buttons
- Smooth loading screen
- Clear empty states
- Responsive layout
- Reusable components:
  - Header
  - Tables
  - Tabs
  - Modals
  - Buttons & Inputs
---

Folder Structure
# ReachInbox Frontend 
Modern, responsive frontend for the ReachInbox email scheduling platform.  
Built with React, TypeScript, and Vite, integrated with real Google OAuth and a production-grade backend.
---

Tech Stack

- **React + TypeScript**
- **Vite** – Fast build tool
- **Axios** – API communication
- **CSS (Custom Theme)** – Dark, modern UI
- **Google OAuth (via Backend Redirect)**
- **JWT** – Auth token handling
---

Features Implemented

Authentication
- Real Google OAuth login (no mock)
- Secure redirect-based login flow
- JWT token handling
- Auto-login using stored token
- Logout functionality

Dashboard
- User info in header:
  - Name
  - Email
  - Avatar
- Sticky top header
- Clean, modern layout matching Figma intent

Email Management
- Tabs:
  - Scheduled Emails
  - Sent Emails
- Dynamic tables with:
  - Email
  - Subject
  - Time
  - Status
- Loading states
- Empty states

Compose New Email
- Modal-based compose flow
- Subject & body input
- CSV / text file upload for leads
- Email count detection
- Scheduling controls:
  - Start time
  - Delay between emails
  - Hourly limit
- Submit data to backend scheduler API
---

UI / UX Highlights

- Dark premium theme
- Gradient primary buttons
- Smooth loading screen
- Clear empty states
- Responsive layout
- Reusable components:
  - Header
  - Tables
  - Tabs
  - Modals
  - Buttons & Inputs
---

Folder Structure
frontend/
├── src/
│ ├── components/
│ │ ├── Header.tsx
│ │ ├── EmailTable.tsx
│ │ ├── Tabs.tsx
│ │ ├── ComposeModal.tsx
│ │ └── pages/
│ │ └── Dashboard.tsx
│ ├── api.ts
│ ├── types.ts
│ ├── App.tsx
│ └── main.tsx
├── index.html
├── package.json
└── vite.config.ts
---
Environment Variables
Create a `.env` file inside `frontend/`
```env
VITE_API_BASE=https://reachinbox-sde-intern-assignment.onrender.com/api
How to Run Frontend Locally
cd frontend
npm install
npm run dev


Frontend runs on:

http://localhost:5173

Authentication Flow

User clicks Continue with Google
Redirects to backend /api/auth/google
Google authenticates user
Backend generates JWT
User is redirected back to frontend with token
Token is stored and used for API requests

API Integration

Axios instance (src/api.ts)
Automatically uses VITE_API_BASE
Token sent via Authorization: Bearer <token>
/auth/me used to fetch user profile
Production Ready
Deployed on Render
Environment-based configuration
Typed API responses
Clean component separation
Real authentication + scheduling flow

Summary

The frontend provides a complete, polished UI for:
Authentication
Scheduling emails
Viewing email status
Managing outreach workflows
Fully integrated with a queue-based, persistent backend.
