# SkillSphere

SkillSphere is a comprehensive professional growth platform that combines freelancing, networking, online learning, competitions, and portfolio building into one integrated solution.

## Features

- 🚀 **Job Board**: Find and post freelance opportunities
- 📚 **Online Learning**: Access courses and educational content
- 🏆 **Competitions**: Participate in skill-building competitions
- 🤝 **Professional Network**: Connect with other professionals
- 📂 **Portfolio Builder**: Showcase your work and achievements
- 💼 **Part-Time Jobs**: Find flexible employment opportunities

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Radix UI
- **Backend**: Node.js, Express
- **Database**: DrizzleORM
- **Authentication**: JWT, Passport
- **State Management**: React Query
- **Routing**: Wouter
- **Development**: Vite, TypeScript

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/skillsphere.git
   cd skillsphere
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5000`.

### Environment Variables

Create a `.env` file in the root directory with the following variables:
```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret
DATABASE_URL=your_database_url
```

## Project Structure

```
├── client/             # Frontend React application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── context/    # React context providers
│   │   ├── hooks/      # Custom React hooks
│   │   ├── lib/        # Utilities and configurations
│   │   └── pages/      # Application pages/routes
├── server/             # Backend Express server
│   ├── auth.ts         # Authentication logic
│   ├── routes.ts       # API routes
│   └── storage.ts      # Database operations
└── shared/             # Shared types and schemas
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run check` - Run TypeScript type checking
- `npm run db:push` - Update database schema

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.