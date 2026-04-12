# Trippn

Trippn is an AI-powered trip planning website built to help users move from inspiration to a structured travel itinerary with a more visual, premium experience.

The app lets users:
- explore the landing page and product flow
- create a trip in a guided 3-step form
- generate an AI itinerary based on destination, budget, travelers, and interests
- view a richer trip result with roadmap-style planning, destination imagery, hotels, and travel visuals

## Website Flow

### 1. Home Page
The home page introduces the product and guides the user through the main experience.

Sections include:
- Hero section
- How It Works
- AI Features
- Popular Destinations
- FAQs
- Footer with social and contact links

### 2. Create Trip Page
The user creates a trip through a step-based flow:

#### Step 1
- travelling from
- destination
- number of days

#### Step 2
- number of travellers
- budget

#### Step 3
- interests
- cuisine preferences
- children travelling or not

The page also includes:
- a branded progress bar
- step indicators
- offers panel with sample referral-style destination offers
- loading states for first paint and AI generation

### 3. Trip Result Page
After generation, the result page shows:
- destination hero section
- hotel recommendations
- vertical roadmap for day-by-day planning
- activity-level visuals
- destination image carousel
- meal suggestions and budget cues

## Core Features

- AI-generated trip planning with Gemini
- destination and travel visuals powered by Pexels
- route-based experience using React Router
- animated UI with Framer Motion
- reusable dialogs, loaders, and layout blocks
- richer result presentation with visual itinerary storytelling

## Tech Stack

- React
- Vite
- Tailwind CSS
- Framer Motion
- React Router
- Lucide React
- React Icons
- Geoapify
- Google Gemini API
- Pexels API

## Project Structure

```txt
src/
  components/
    home/
    trip-result/
    ui/
  Pages/
    Home.jsx
    CreateTrip.jsx
    TripResult.jsx
  Services/
    aiModel.js
    pexelsService.js
```

## Environment Variables

Create a `.env` file based on `.env.example`.

Required variables:

```env
VITE_GEOAPIFY_API_KEY=
VITE_PEXELS_API_KEY=
VITE_GOOGLE_GEMINI_API_KEY=
VITE_GOOGLE_OAUTH_CLIENT_ID=
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Current UX Highlights

- premium dark travel-themed UI
- orange-led brand accents
- animated loaders and section reveals
- guided form experience
- visual itinerary storytelling
- destination-driven imagery across the app

## Upcoming Features

### Firebase Integration
Upcoming work will include Firebase database integration for persistent trip storage.

Planned behavior:
- store generated trips in Firebase
- connect trips to the logged-in user
- fetch and display saved trips when a user logs in with a particular email
- make it easier for returning users to continue planning from previous trip data

### Additional Product Plans
- contact us page
- saved trips dashboard
- deeper personalization
- booking and budget modules
- map-based enhancements inside trip results

## Notes

- Pexels images are used for destination and travel visuals
- current offer values are dummy values for UI/testing purposes
- Firebase-backed trip persistence is planned but not yet implemented
