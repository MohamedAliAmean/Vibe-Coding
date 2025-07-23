# Website Sections Generator

A full-stack application that generates website sections based on user ideas. Built with NestJS backend and Next.js frontend.

## Project Structure

```
├── backend/          # NestJS API server
├── frontend/         # Next.js React application
└── README.md         # This file
```

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (running on localhost:27017)
- npm or yarn package manager

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Backend Setup (NestJS)

```bash
cd backend
npm install
```

**Environment Setup:**
- Ensure MongoDB is running on `mongodb://localhost:27017`
- The application will create a database named `sections-db`

**Start the backend:**
```bash
# Development mode with hot reload
npm run start:dev

# Production mode
npm run start:prod
```

The backend will run on `http://localhost:3001`

### 3. Frontend Setup (Next.js)

```bash
cd frontend
npm install
```

**Start the frontend:**
```bash
# Development mode with hot reload
npm run dev

# Production build
npm run build
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### POST /sections
Creates website sections based on an idea.

**Request Body:**
```json
{
  "idea": "Landing page for bakery"
}
```

**Response:**
```json
{
  "id": "section_id",
  "idea": "Landing page for bakery",
  "sections": ["Hero Section", "About Us", "Services", "Testimonials", "Contact"],
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### GET /sections/:id
Retrieves a specific section by ID.

## Features

- ✅ Generate website sections based on user ideas
- ✅ MongoDB integration for data persistence
- ✅ Form validation and error handling
- ✅ Responsive design with Tailwind CSS
- ✅ Preview page for generated sections
- ✅ CORS enabled for frontend-backend communication

## Technology Stack

**Backend:**
- NestJS (Node.js framework)
- MongoDB with Mongoose
- TypeScript
- Class Validator for validation

**Frontend:**
- Next.js 15 (React framework)
- TypeScript
- Tailwind CSS
- Axios for API calls

## Development Commands

### Backend
```bash
npm run start:dev    # Start with hot reload
npm run build        # Build for production
npm run test         # Run unit tests
npm run test:e2e     # Run end-to-end tests
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Configuration

### Backend Configuration
- **Port:** 3001 (configurable via PORT environment variable)
- **Database:** MongoDB at `mongodb://localhost:27017/sections-db`
- **CORS:** Enabled for `http://localhost:3000`

### Frontend Configuration
- **Port:** 3000
- **API Base URL:** `http://localhost:3001`

## Notes

- The application currently generates mock sections: "Hero Section", "About Us", "Services", "Testimonials", "Contact"
- MongoDB must be running before starting the backend
- The frontend automatically redirects to the preview page after section generation
- All API responses include proper error handling and validation

## Troubleshooting

1. **MongoDB Connection Issues:**
   - Ensure MongoDB is installed and running
   - Check if port 27017 is available
   - Verify MongoDB service is started

2. **CORS Issues:**
   - Backend is configured to accept requests from `http://localhost:3000`
   - If using different ports, update CORS settings in `backend/src/main.ts`

3. **Port Conflicts:**
   - Backend default: 3001
   - Frontend default: 3000
   - Change ports in respective configuration files if needed

## Future Enhancements

- [ ] AI-powered section generation
- [ ] User authentication
- [ ] Section customization
- [ ] Export functionality
- [ ] Template library
