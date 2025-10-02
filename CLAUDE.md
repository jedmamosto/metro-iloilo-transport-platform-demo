# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Metro Iloilo Transport Platform - A Next.js application demonstrating live fleet tracking for transport cooperative managers in Iloilo City. The platform showcases real-time vehicle monitoring, route progress visualization, and operational oversight capabilities.

## Development Commands

- `npm run dev` - Start development server with Turbopack (opens at http://localhost:3000)
- `npm run build` - Build production bundle with Turbopack
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Tech Stack

- **Framework:** Next.js 15.5.4 with App Router (Turbopack enabled)
- **Runtime:** React 19.1.0
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **Fonts:** Geist Sans and Geist Mono (via next/font)

## Project Structure

- `src/app/` - Next.js App Router pages and layouts
  - `layout.tsx` - Root layout with font configuration
  - `page.tsx` - Main landing page
  - `globals.css` - Global styles and Tailwind directives
- `docs/claude-code/demo-01/` - Business requirements and feature specifications
- `public/` - Static assets (images, icons)

## Business Context (Demo-01)

The first prototype demonstrates **live fleet tracking** for a single cooperative bus in Iloilo City:

- **Live Vehicle Tracking:** Vehicle icon moves along route every 2-3 seconds
- **Dynamic Route Visualization:** Traveled path fades to lighter color, upcoming path stays bright
- **Route Adherence:** Simulated vehicle follows predefined path strictly
- **Interactive Map:** Centered on Iloilo City with zoom/pan capabilities

See `docs/claude-code/demo-01/instruction.md` for complete business logic and stakeholder value proposition.

## Key Conventions

- Source files are in `src/` directory (not root-level `app/`)
- Uses App Router file conventions (layout.tsx, page.tsx)
- Tailwind utility-first styling with custom CSS variables for theming
- Next.js Image component for optimized asset loading
