# SkillSphere - Professional Growth Platform

## Overview
SkillSphere is a comprehensive full-stack web platform that combines freelancing, professional networking, online learning, competitions, and portfolio building into one unified system. Built with React, Express.js, and in-memory storage.

## Purpose
The platform enables users to:
1. Find and post freelance jobs
2. Network with professionals and share content
3. Learn through online courses and earn certificates
4. Participate in coding competitions and challenges
5. Build and showcase professional portfolios
6. Discover part-time job opportunities
7. Manage the platform (admin panel)

## Tech Stack

### Frontend
- **Framework**: React 18 with Vite
- **Routing**: Wouter
- **Styling**: Tailwind CSS with Shadcn UI components
- **State Management**: Context API (Auth, Theme)
- **Data Fetching**: TanStack Query (React Query v5)
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js with Express.js
- **Storage**: In-memory storage (MemStorage)
- **Authentication**: JWT-based authentication
- **Validation**: Zod schemas
- **Type Safety**: TypeScript with Drizzle ORM schemas

## Project Structure

```
/client
├── /src
│   ├── /components    # Reusable UI components
│   │   ├── Navbar.tsx
│   │   └── /ui        # Shadcn UI components
│   ├── /context       # React Context providers
│   │   ├── AuthContext.tsx
│   │   └── ThemeProvider.tsx
│   ├── /pages         # Page components
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Jobs.tsx
│   │   ├── JobDetail.tsx
│   │   ├── CreateJob.tsx
│   │   ├── Courses.tsx
│   │   ├── Competitions.tsx
│   │   ├── Network.tsx
│   │   ├── MyPortfolio.tsx
│   │   ├── PartTimeJobs.tsx
│   │   └── AdminDashboard.tsx
│   ├── App.tsx
│   └── main.tsx
/server
├── routes.ts          # API routes
├── storage.ts         # Data storage interface
└── index.ts
/shared
└── schema.ts          # Shared TypeScript schemas
```

## Features

### Authentication System
- User registration with role selection (user, instructor, employer, admin)
- JWT-based login and session management
- Role-based access control
- Protected routes and API endpoints

### Freelancing Hub
- Browse and search freelance job listings
- Filter by job type, skills, location
- Detailed job pages with application system
- Post new jobs (for employers)
- Track job applications

### Professional Network
- Create and share posts
- Like and comment on posts
- View activity feed
- Connect with other professionals
- Build professional presence

### Learning Platform
- Browse course catalog
- Filter by level and category
- View course details with ratings
- Enroll in courses
- Track learning progress
- Instructor dashboard (future)

### Competitions
- Browse coding challenges
- Filter by difficulty level
- View competition details
- Join competitions
- Submit solutions
- Live leaderboard (future)

### Portfolio Builder
- Create personal portfolio
- Add projects with descriptions
- Include live URLs and GitHub links
- Tag projects with technologies
- Track profile views and likes
- Showcase certificates

### Part-Time Jobs
- Browse local part-time opportunities
- Filter by job type
- View location and hourly pay
- Apply to positions
- Track applications

### Admin Panel
- Platform statistics dashboard
- User management
- Content moderation
- Activity monitoring
- System health checks

## Data Models

### User
- id, username, email, password (hashed)
- role: user | instructor | employer | admin
- fullName, bio, avatar
- skills, experience, location
- socialLinks (LinkedIn, GitHub, Twitter)

### Job
- title, description, company
- type, location, budget
- required skills
- postedBy (user reference)
- applicants array
- status (open/closed)

### Course
- title, description, thumbnail
- instructor, category, level
- duration, price, rating
- enrolledStudents array
- lessons (video content structure)

### Competition
- title, description, difficulty
- category, deadline, prize
- participants array
- submissions with scores

### Portfolio
- userId reference
- title, tagline
- projects array (title, description, tags, URLs)
- certificates array
- viewCount, likes

### PartTimeJob
- Similar to Job but for local part-time work
- Includes distance information
- Pay per hour

### Post (Network)
- userId, content, imageUrl
- likes array
- comments array

### Connection
- userId, connectedUserId
- status (pending/accepted)

## API Routes

### Authentication
- POST /api/auth/register - Create new user
- POST /api/auth/login - Login and get JWT token
- GET /api/auth/me - Get current user info

### Jobs
- GET /api/jobs - List all jobs
- GET /api/jobs/:id - Get job details
- POST /api/jobs/create - Create new job
- POST /api/jobs/apply/:id - Apply to job

### Courses
- GET /api/courses - List all courses
- GET /api/courses/:id - Get course details
- POST /api/courses/enroll/:id - Enroll in course

### Competitions
- GET /api/competitions - List all competitions
- GET /api/competitions/:id - Get competition details
- POST /api/competitions/join/:id - Join competition

### Portfolio
- GET /api/portfolio/my - Get user's portfolio
- POST /api/portfolio/project - Add project
- PUT /api/portfolio - Update portfolio

### Part-Time Jobs
- GET /api/part-time - List part-time jobs

### Network
- GET /api/posts - Get all posts
- POST /api/posts - Create new post
- POST /api/posts/:id/like - Like/unlike post

### Admin
- GET /api/admin/stats - Get platform statistics

## Design System

### Colors
- Primary: Blue (#0066CC) - Professional, trustworthy
- Success: Green - Completions, achievements
- Warning: Orange - Deadlines, alerts
- Backgrounds: Subtle grays with dark mode support

### Typography
- Font Family: Inter (clean, professional)
- Hierarchy: Clear distinction between headings and body text
- Consistent sizing across the platform

### Components
- Cards: Elevated with subtle shadows
- Buttons: Clear hover and active states
- Forms: Inline validation with helpful error messages
- Navigation: Sticky navbar with role-based menu items

### Spacing
- Consistent padding: p-4, p-6, p-8
- Gap utilities: gap-4, gap-6
- Container: max-w-7xl with responsive padding

## User Roles

### User (Default)
- Access all features except job/course creation
- Can apply for jobs, enroll in courses
- Create portfolio, join competitions
- Post on network feed

### Instructor
- All user features
- Create and manage courses
- View student enrollment data

### Employer
- All user features
- Post and manage job listings
- Review applications

### Admin
- Full platform access
- User management
- Content moderation
- View analytics
- System administration

## Development Workflow

### Running the Project
```bash
npm run dev
```
This starts both the frontend (Vite) and backend (Express) servers.

### Storage
Currently using in-memory storage (MemStorage). Data persists during the session but resets on server restart. Ready for database migration when needed.

### Authentication Flow
1. User registers/logs in
2. Server validates credentials
3. JWT token issued and stored in localStorage
4. Token included in subsequent API requests
5. Protected routes verify token

## Recent Changes
- Initial project setup
- Complete schema definition for all entities
- Frontend components for all major features
- Authentication system with JWT
- Role-based access control
- Responsive design with dark mode support
- Complete routing structure

## Next Steps (Future Enhancements)
- WebSocket integration for real-time chat
- File upload with Cloudinary
- PDF certificate generation
- Email notifications with Nodemailer
- Payment integration for courses
- Code execution for competitions
- Advanced analytics dashboard
- Database migration to PostgreSQL/MongoDB
