# 🌍 Travel Explorer

A responsive travel planning web application built with React and TypeScript.

Explore countries around the world, search and filter destinations, save favorites, and create personal travel plans.

## 🌐 Live Demo

[Open Travel Explorer](https://travel-explorer-v2.vercel.app/)

## ✨ Features

- 🌍 Browse countries from around the world
- 🔎 Search countries by name with debounce
- 🎯 Filter countries by region
- 📊 Sort countries by population
- ❤️ Add and remove favorite countries
- 📄 View detailed country information
- ✈️ Create personal travel plans
- ✏️ Edit existing travel plans
- 🗑️ Delete travel plans
- 💾 Persist favorites and travel plans with localStorage
- 📱 Fully responsive design for mobile, tablet, and desktop

## 🛠️ Tech Stack

- React
- TypeScript
- Vite
- React Router
- CSS (Flexbox & Grid)
- REST API
- localStorage

## 🧩 Architecture

The application follows a component-based structure with separate pages, reusable UI components, API services, and TypeScript types.

```text
src/
├── components/
│   ├── CountryCard
│   ├── CountryList
│   ├── SearchBar
│   └── Filters
│
├── pages/
│   ├── Explore.tsx
│   ├── CountryDetails.tsx
│   ├── Favorites.tsx
│   └── Trips.tsx
│
├── services/
│   └── CountriesApi.ts
│
└── types/
    ├── country.ts
    └── trip.ts

🔌 API
Country data is provided by the REST Countries API:
https://restcountries.com/
The application fetches country data from the API and handles searching, filtering, sorting, and displaying detailed country information.

💡 Key Highlights
- Debounced search to reduce unnecessary operations
- Client-side filtering and sorting
- Reusable React components
- API integration with asynchronous data handling
- Persistent client-side data with localStorage
- Responsive UI architecture
- Type-safe development with TypeScript
- Client-side routing with React Router

📱 Responsive Design
The application is fully responsive and optimized for:
- 📱 Mobile
- 📲 Tablet
- 💻 Desktop

🚀 Getting Started
Clone the repository and install dependencies:
git clone https://github.com/theendtx/Travel-Explorer-v2.git
cd Travel-Explorer-v2
npm install
npm run dev

The application will be available at:
http://localhost:5173

👨‍💻 Author
Developed by theendtx
