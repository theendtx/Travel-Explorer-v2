# 🌍 Travel Explorer

A modern travel planning web application built with React and TypeScript.

---

## 🚀 Project Overview

Travel Explorer is a web application that allows users to explore countries, search and filter them, save favorites, and create personal trip plans.

Users can:

* 🌎 Browse countries from around the world
* 🔍 Search countries by name (with debounce)
* 🎯 Filter by region and sort by population
* ❤️ Add and remove favorite countries
* ✈️ Create, edit, and delete travel plans

---

## 🛠 Tech Stack

* **React** — UI development
* **TypeScript** — type safety
* **Vite** — fast build tool
* **React Router** — routing
* **CSS (Flexbox + Grid)** — layout and responsiveness
* **REST Countries API** — data source
* **localStorage** — data persistence

---

## 🧱 Architecture

Project structure:

```
src/
 ├── components/
 │    ├── CountryCard
 │    ├── CountryList
 │    ├── SearchBar
 │    ├── Filters
 │
 ├── pages/
 │    ├── Explore.tsx
 │    ├── CountryDetails.tsx
 │    ├── Favorites.tsx
 │    ├── Trips.tsx
 │
 ├── services/
 │    └── CountriesApi.ts
 │
 ├── types/
 │    ├── country.ts
 │    └── trip.ts
```

---

## ⚙️ Features

### 🌍 Explore Page

* Fetch and display all countries
* Search with debounce
* Filter by region
* Sort by population

### 📄 Country Details

* Flag
* Capital
* Population
* Region
* Languages

### ❤️ Favorites

* Add/remove favorites
* Persistent storage using localStorage

### ✈️ Trips

* Create trips
* Edit trips
* Delete trips
* Stored in localStorage

---

## 📱 Responsive Design

The application is fully responsive and works on:

* Mobile devices 📱
* Tablets 📲
* Desktop 💻

---

## 🌐 API

Data provided by:

https://restcountries.com/v3.1

---

## 🚀 Deployment

Deployed using **Vercel**:

👉 https://travel-explorer-v2.vercel.app/

---

## 📦 Installation

```bash
npm install
npm run dev
```

---

## 🧠 What I Learned

* React component architecture
* State management and data flow
* API integration and async logic
* Handling loading and error states
* Responsive design principles
* LocalStorage persistence
* Clean code and project structure

---

## 📌 Future Improvements

* User authentication
* Dark/light mode
* Improved UI/UX
* Animations and transitions

---

## 👨‍💻 Author

Developed by Kana 🚀
