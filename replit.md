# SleeckOS - Modern OS Development Platform

## Overview

SleeckOS is a modern web application designed as an educational platform for operating systems development. The project features a dark-themed, minimal aesthetic with sophisticated animations and interactive elements. It serves as a course platform where users can learn about OS development, programming, and modern technology through structured educational content.

The application combines a polished frontend with course management capabilities, emphasizing visual appeal through constellation-style animations, particle backgrounds, and smooth interactions inspired by modern tech companies like Linear, Vercel, and GitHub.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The application uses a **React + TypeScript** architecture with **Vite** as the build tool. The frontend follows a component-based structure with:

- **React Router** (wouter) for client-side routing
- **Framer Motion** for sophisticated animations and transitions
- **shadcn/ui** component library built on Radix UI primitives
- **TailwindCSS** for styling with custom design tokens
- **Tanstack Query** for data fetching and state management

The design system emphasizes a **dark mode-first approach** with a sophisticated color palette using pure black backgrounds, white text, and blue accents. Typography uses Inter font for clean, modern aesthetics.

### Backend Architecture
The backend follows a **Node.js + Express** architecture with:

- **Express.js** server with middleware for JSON handling and logging
- **TypeScript** throughout the entire stack
- **Drizzle ORM** for database operations with PostgreSQL dialect
- **Zod** for schema validation and type safety
- **Memory storage implementation** with interface for future database integration

The server implements a modular route system with centralized error handling and development-friendly logging.

### Component Design Patterns
The frontend implements several sophisticated design patterns:

- **Constellation Reveal System**: Interactive SVG animations that form text on hover/focus
- **Particle Background**: Canvas-based particle system with performance optimizations
- **3D Card Effects**: Mouse-tracking transforms for immersive hover states
- **Responsive Animation System**: Accessibility-aware animations that respect `prefers-reduced-motion`

### Data Architecture
The application uses a **shared schema approach** where TypeScript types are shared between client and server:

- Centralized schema definitions in `shared/schema.ts`
- Drizzle ORM with Zod validation
- Type-safe API contracts
- Database migrations support

### Styling Architecture
The project implements a **design system approach** with:

- **Custom CSS variables** for theming with light/dark mode support
- **Component variants** using class-variance-authority
- **Responsive design** with mobile-first approach
- **Performance-optimized animations** using CSS transforms and GPU acceleration

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connectivity optimized for serverless environments
- **drizzle-orm**: Type-safe ORM for database operations
- **express**: Web application framework for the Node.js backend
- **react**: Frontend UI library with hooks and modern patterns
- **vite**: Fast build tool and development server

### UI and Animation Libraries
- **@radix-ui/react-***: Comprehensive collection of accessible UI primitives including dialogs, dropdowns, forms, and navigation components
- **framer-motion**: Production-ready motion library for React animations
- **lucide-react**: Feather-inspired icon library
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe component variants

### Development Tools
- **typescript**: Static type checking across the entire stack
- **@tanstack/react-query**: Data fetching and caching library
- **wouter**: Lightweight React router
- **cmdk**: Command palette component
- **embla-carousel-react**: Touch-friendly carousel component

### Database and Validation
- **drizzle-zod**: Integration between Drizzle ORM and Zod validation
- **zod**: Schema validation library
- **connect-pg-simple**: PostgreSQL session store

### Additional Utilities
- **clsx**: Utility for constructing className strings
- **date-fns**: Modern date utility library
- **nanoid**: Unique string ID generator
- **react-hook-form**: Performant forms with easy validation