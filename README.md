# YouthConnex — Interactive GIS Economic Opportunity Ecosystem

**YouthConnex** is a modern, interactive, location-based economic opportunity ecosystem designed to connect young people with employment, apprenticeships, TVET programs, and local development opportunities. By mapping real opportunities across critical sectors directly on an interactive GIS map, YouthConnex transforms how youth discover jobs and how businesses, cooperatives, and government entities hire.

---

## 📂 Project Structure & Deliverables

The workspace contains the complete specifications, interactive prototypes, slide decks, and a fully featured React application:

### 1. Root Resources & Documentation
* **[YOUTHCONNEX_GIS_SPECIFICATION.md](file:///d:/youthconnex/YOUTHCONNEX_GIS_SPECIFICATION.md)**: A comprehensive design and system specification outlining the core concept, target user types, technical stack recommendations, detailed database schema, and product roadmap.
* **[youthconnex_gis_sector_platform.html](file:///d:/youthconnex/youthconnex_gis_sector_platform.html)**: A standalone, interactive HTML/JS prototype of the YouthConnex GIS Platform. It simulates the map UI, sector layers, user journeys, and dashboard analytics.
* **[youthconnex_presentation.pptx](file:///d:/youthconnex/youthconnex_presentation.pptx)**: Slide presentation highlighting the value proposition, business model, GIS features, and implementation roadmap.
* **[.gitignore](file:///d:/youthconnex/.gitignore)**: Global workspace configuration to ignore local dependencies (`node_modules`), build directories, and configurations.

### 2. **[youthconnex/](file:///d:/youthconnex/youthconnex/)** (React Frontend Application)
A fully functional Single Page Application (SPA) built using **React 18**, **Vite**, **Tailwind CSS**, and **React Router v6**. It features a modern, responsive user interface with native integrations for:
* **Mapbox GL JS**: Rendering high-performance vector maps, interactive layers, and custom markers.
* **Firebase (Firestore/Auth)**: Providing user authentication and live database storage for economic opportunities.

---

## 🗺️ Core GIS Sector Layers

YouthConnex groups opportunities into five distinct, color-coded, and filterable layers on the interactive map:

| Sector | Color | Icon | Represents |
|--------|-------|------|------------|
| **Agriculture** | 🟢 Green | 🌱 | Agricultural processing cooperatives, farms, processing units |
| **Construction** | 🟠 Orange | 🏗️ | Active construction sites, building projects, road rehabilitation |
| **Services** | 🟣 Purple | 🛒 | Informal sector businesses, local service providers, apprenticeships |
| **State Projects** | 🔴 Blue/Red | 🏢 | Government-funded labor-intensive (HIMO) public works |
| **Training** | 🟡 Yellow | 📚 | TVET centers, vocational schools, and skill development institutes |

---

## 💻 Tech Stack (React App)

The core application in **[youthconnex/](file:///d:/youthconnex/youthconnex/)** utilizes:

* **Framework & Build Tool**: React 18 & Vite
* **Styling**: Tailwind CSS (Utility-first framework)
* **Routing**: React Router v6
* **Database & Auth**: Firebase Auth and Firestore
* **Mapping Engine**: Mapbox GL JS (via standard Mapbox SDK)
* **Icons**: Tabler Icons

---

## 🚀 Getting Started

To run the React web application locally, follow these steps:

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (v16 or higher) and `npm` installed.

### 2. Installation
Navigate into the React application directory and install dependencies:
```bash
cd youthconnex
npm install
```

### 3. Environment Setup
Create a `.env` file in the `youthconnex` directory:
```bash
cp .env.example .env
```

Open the `.env` file and configure your API keys and endpoints:
* **Mapbox**: Provide your public access token in `VITE_MAPBOX_ACCESS_TOKEN`.
* **Firebase**: Set up your Firebase project config keys (apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId).

### 4. Running the Development Server
Start the local server:
```bash
npm run dev
```
The application will be accessible at `http://localhost:5173`.

### 5. Build for Production
To bundle the application for production deployment:
```bash
npm run build
```
This generates optimized static files in the `dist/` directory.

---

## 🛠️ Code Architecture

The React app's source code is organized as follows:
* **[src/components/map/](file:///d:/youthconnex/youthconnex/src/components/map/)**: Contains map visualization components such as [MapView.jsx](file:///d:/youthconnex/youthconnex/src/components/map/MapView.jsx), [LayerControls.jsx](file:///d:/youthconnex/youthconnex/src/components/map/LayerControls.jsx), and [MapPopup.jsx](file:///d:/youthconnex/youthconnex/src/components/map/MapPopup.jsx).
* **[src/context/](file:///d:/youthconnex/youthconnex/src/context/)**: React Contexts for global state management: [AuthContext.jsx](file:///d:/youthconnex/youthconnex/src/context/AuthContext.jsx), [FilterContext.jsx](file:///d:/youthconnex/youthconnex/src/context/FilterContext.jsx), and [ToastContext.jsx](file:///d:/youthconnex/youthconnex/src/context/ToastContext.jsx).
* **[src/pages/](file:///d:/youthconnex/youthconnex/src/pages/)**: Page views like [Dashboard.jsx](file:///d:/youthconnex/youthconnex/src/pages/Dashboard.jsx), [MapPage.jsx](file:///d:/youthconnex/youthconnex/src/pages/MapPage.jsx), [Login.jsx](file:///d:/youthconnex/youthconnex/src/pages/Login.jsx), and [Register.jsx](file:///d:/youthconnex/youthconnex/src/pages/Register.jsx).
* **[src/firebase/](file:///d:/youthconnex/youthconnex/src/firebase/)**: Database adapters, schema structure, and mock opportunity data generators.
