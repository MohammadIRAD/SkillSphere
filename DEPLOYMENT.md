# Deployment Guide

## Prerequisites

1. Create accounts on:
   - [Render.com](https://render.com) for hosting
   - [Neon.tech](https://neon.tech) for PostgreSQL database (optional, or use any PostgreSQL provider)

## Deployment Steps

1. Fork this repository to your GitHub account

2. Set up the database:
   - Create a new PostgreSQL database on Neon.tech or your preferred provider
   - Copy your database connection string

3. Deploy on Render.com:
   - Go to https://dashboard.render.com/new
   - Click "New Web Service"
   - Connect your GitHub repository
   - Select the main branch
   - Fill in the following details:
     - Name: `skillsphere-api`
     - Environment: `Node`
     - Build Command: `npm install && npm run build`
     - Start Command: `npm start`
   - Add environment variables:
     - `NODE_ENV`: `production`
     - `PORT`: `10000`
     - `JWT_SECRET`: Generate a secure random string
     - `DATABASE_URL`: Your PostgreSQL connection string

4. The web service will be available at:
   - API: https://skillsphere-api.onrender.com
   - Web App: https://skillsphere-web.onrender.com

## Environment Variables

Create a `.env` file with these variables:

```env
# Server Environment Variables
NODE_ENV=production
PORT=5000
JWT_SECRET=your-secret-key-here
DATABASE_URL=your-database-url-here

# Client Environment Variables
VITE_API_URL=https://skillsphere-api.onrender.com
```

## Deployment Configuration

The `render.yaml` file in the repository root configures automatic deployment on Render.com. It sets up:
- A Node.js web service for the API
- A static site for the frontend
- Environment variables and build commands

## Manual Deployment

If you prefer to deploy manually or use a different provider:

1. Build the application:
   ```bash
   npm install
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## Checking Deployment Status

1. API Health Check:
   ```bash
   curl https://skillsphere-api.onrender.com/__health
   ```

2. Visit the web app:
   - Open https://skillsphere-web.onrender.com in your browser

## Troubleshooting

1. If the API returns 503:
   - Check Render.com logs in the web service dashboard
   - Verify environment variables are set correctly
   - Ensure database connection is working

2. If the web app shows a blank page:
   - Check browser console for errors
   - Verify VITE_API_URL is set correctly
   - Check if API is responding