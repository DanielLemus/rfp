# RFP Management System

A React application for managing RFP (Request for Proposal) events with search and filtering capabilities.

## Features

- View RFP cards with event details
- Search by RFP name and agreement type
- Filter by RFP status
- Responsive design for desktop and mobile
- Event tags for quick identification

## Tech Stack

- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Zustand for state management
- React Query for data fetching
- React Router for navigation

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── components/          # Reusable UI components
├── data/               # Mock data and API services
├── pages/              # Page components
├── stores/             # Zustand stores
├── types/              # TypeScript type definitions
└── router/             # Route configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
