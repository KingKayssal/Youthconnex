# YouthConnex Mapbox Integration Guide

## Overview

This document provides a complete guide to the Mapbox GIS integration in the YouthConnex React application. The integration includes interactive map visualization, geospatial queries, and real-time opportunity discovery.

---

## Architecture Overview

### Components Structure

```
src/
├── components/map/
│   ├── MapView.jsx              # Main map component
│   ├── OpportunityMarker.jsx    # Individual markers
│   ├── MapPopup.jsx             # Marker detail popups
│   ├── LayerControls.jsx        # Sector layer toggles
│   ├── MapView.css
│   ├── OpportunityMarker.css
│   ├── MapPopup.css
│   └── LayerControls.css
│
├── pages/
│   ├── MapPage.jsx              # Main map page
│   └── MapPage.css
│
├── config/
│   ├── mapbox.js                # Mapbox configuration
│   └── firebase.js              # Firebase setup (existing)
│
├── firebase/
│   ├── firebaseConfig.js        # Firebase initialization (existing)
│   ├── schema.js                # Firestore schema definitions
│   └── opportunityService.js    # Geospatial queries
│
├── hooks/
│   ├── useGeolocation.js        # User location detection
│   └── useOpportunities.js      # Opportunity data management
│
└── utils/
    └── geoUtils.js              # Geospatial utilities
```

### Data Flow Diagram

```
User Visits /map
    ↓
MapPage Component Loads
    ↓
useGeolocation Hook → Requests user location
    ↓
useOpportunities Hook → Fetches opportunities from Firebase
    ↓
geoUtils Functions → Calculate distances, filter by radius
    ↓
MapView Component → Renders Mapbox with markers
    ↓
OpportunityMarker Components → Display on map
    ↓
User Click → MapPopup Shows details
```

---

## Installation & Setup

### 1. Install Dependencies

```bash
cd frontend
npm install mapbox-gl react-map-gl geofire-common
```

### 2. Get Mapbox Access Token

1. Visit [Mapbox](https://www.mapbox.com/)
2. Create a free account
3. Go to **Account > Tokens**
4. Copy your **Default public token**
5. Add to `.env`:

```env
VITE_MAPBOX_TOKEN=pk.eyJ...your_token_here...
```

### 3. Configure Firebase

Ensure your `.env` has valid Firebase credentials:

```env
VITE_FIREBASE_API_KEY=your-actual-key
VITE_FIREBASE_PROJECT_ID=your-project-id
# ... other Firebase config
```

### 4. Create Firebase Collections

In Firestore, create these collections:
- `opportunities`
- `users`
- `applications`
- `stateProjects`

---

## Key Components Explained

### MapView.jsx

**Purpose:** Main interactive map component

**Key Features:**
- Renders Mapbox GL map
- Manages marker visibility based on active layers
- Handles marker click events
- Includes navigation and geolocation controls

**Props:**
```javascript
<MapView
  opportunities={[]}        // Array of opportunity objects
  onMarkerClick={() => {}}  // Callback when marker clicked
  loading={false}           // Loading state
  initialLocation={{        // User's initial location
    latitude: 3.8480,
    longitude: 11.5021
  }}
/>
```

**Sectors/Layers:**
- Agriculture (🌱, #2d7a3a)
- Construction (🏗️, #c45c1a)
- Services (🛠️, #7c3aed)
- State HIMO (🏢, #1a6fa8)
- Training (📚, #f59e0b)

### OpportunityMarker.jsx

**Purpose:** Individual marker component

**Features:**
- Teardrop-shaped pins (standard map marker design)
- Color-coded by sector
- Emoji icon by category
- Scale on hover and selection
- Smooth transitions

### MapPopup.jsx

**Purpose:** Detailed information popup on marker click

**Displays:**
- Opportunity title and organization
- Distance from user
- Number of vacancies
- Daily wage/compensation
- Rating and reviews
- Support services (accommodation, meals, transport, PPE)
- Call-to-action buttons

### LayerControls.jsx

**Purpose:** Toggles visibility of opportunity sectors

**Features:**
- Checkbox for each sector
- Color indicator dots
- Count available opportunities per sector

---

## Hooks Explained

### useGeolocation()

**Purpose:** Get user's current location

```javascript
const { location, error, loading } = useGeolocation();

// Returns:
// location: { latitude: 3.8480, longitude: 11.5021 }
// error: null or error message
// loading: true while requesting permission
```

**Features:**
- Requests browser geolocation permission
- Handles errors gracefully
- Stores location in localStorage for persistence
- Auto-retry from stored location if permission denied

### useOpportunities()

**Purpose:** Manage opportunity data fetching and filtering

```javascript
const {
  opportunities,           // All opportunities
  filteredOpportunities,  // After applying filters
  loading,
  error,
  fetchAllOpportunities,
  fetchByCategory,
  fetchNearby,
  search,
  applyFilters,
  sort
} = useOpportunities();
```

**Key Methods:**
- `fetchAllOpportunities()` - Get all open opportunities
- `fetchByCategory(category)` - Filter by sector
- `fetchNearby(lat, lon, radius, category)` - Get nearby opportunities
- `fetchByCommune(commune, category)` - Filter by location
- `search(filters)` - Advanced search
- `applyFilters(criteria)` - Client-side filtering
- `sort(sortBy)` - Sort results

---

## Geospatial Utilities (geoUtils.js)

### Key Functions

#### `calculateDistance(lat1, lon1, lat2, lon2)`
Haversine formula for distance calculation
```javascript
const distance = calculateDistance(3.8480, 11.5021, 3.9000, 11.5500);
// Returns: 7.2 (km)
```

#### `filterNearbyOpportunities(opportunities, userLat, userLon, radiusKm)`
Filter array of opportunities within radius
```javascript
const nearby = filterNearbyOpportunities(
  opportunities,
  3.8480,
  11.5021,
  10  // 10 km radius
);
// Returns sorted array with distance property
```

#### `generateSearchBounds(centerLat, centerLon, radiusKm)`
Create rectangular bounds for viewport queries
```javascript
const bounds = generateSearchBounds(3.8480, 11.5021, 10);
// Returns: { minLat, maxLat, minLon, maxLon, radius }
```

#### `clusterOpportunities(opportunities, clusterRadiusKm)`
Group nearby opportunities into clusters
```javascript
const clusters = clusterOpportunities(opportunities, 2);
// Returns: [{ id, center, opportunities, count }, ...]
```

#### `formatDistance(distanceKm)`
Format distance for display
```javascript
formatDistance(0.8)  // "800m"
formatDistance(7.2)  // "7.2 km"
```

---

## Firebase Service (opportunityService.js)

### Query Functions

#### Get All Opportunities
```javascript
const opportunities = await getAllOpportunities();
```

#### Get by Category
```javascript
const agriOpps = await getOpportunitiesByCategory('agriculture');
```

#### Get Nearby (Client-side filtering)
```javascript
const nearby = await getNearbyOpportunities(
  3.8480,    // latitude
  11.5021,   // longitude
  10,        // radius in km
  'construction'  // optional category
);
```

#### Search with Multiple Criteria
```javascript
const results = await searchOpportunities({
  category: 'construction',
  keyword: 'masonry',
  minSalary: 4000,
  skillLevel: 'semi-skilled',
  durationType: 'temporary',
  sortBy: 'salary'
});
```

#### Get Featured Opportunities
```javascript
const featured = await getFeaturedOpportunities(10);
```

---

## Firebase Schema

### Opportunities Collection

**Document Structure:**
```javascript
{
  id: "opp_001",
  title: "Farm Assistants Needed",
  description: "Harvest season workers needed...",
  category: "agriculture",
  
  location: {
    latitude: 3.8480,
    longitude: 11.5021,
    address: "Mbalmayo",
    geohash: "s0gs3d",
    administrativeLevel: {
      region: "Centre",
      division: "Mfoundi",
      commune: "Yaoundé",
      village: "Mbalmayo"
    }
  },
  
  organizationId: "coop_001",
  organizationName: "Mbalmayo Cocoa Cooperative",
  organizationType: "cooperative",
  
  contactInfo: {
    name: "Jean Paul",
    phone: "+237672345678",
    whatsapp: "+237672345678",
    email: "coop@example.com"
  },
  
  jobDetails: {
    vacancies: 10,
    skillLevel: "unskilled",
    requiredSkills: [],
    experience: 0,
    certificates: []
  },
  
  compensation: {
    currency: "FCFA",
    dailyRate: 4500,
    monthlyRate: null,
    totalBudget: 1350000
  },
  
  duration: {
    type: "seasonal",
    startDate: Timestamp,
    endDate: Timestamp,
    daysPerWeek: 5,
    hoursPerDay: 8
  },
  
  support: {
    ppe_provided: false,
    accommodation: true,
    meals: true,
    transport: true
  },
  
  status: "open",
  featured: true,
  rating: { average: 4.7, count: 23 },
  
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Recommended Firestore Indexes

1. **Opportunities by Category & Status**
   - Fields: category, status, createdAt
   - Query: Latest opportunities by sector

2. **Opportunities by Location**
   - Fields: location.latitude, location.longitude, status
   - Query: Opportunities in geographic bounds

3. **Applications by User**
   - Fields: youthId, status, appliedAt
   - Query: User's application history

---

## Usage Examples

### Example 1: Display Map with Nearby Opportunities

```javascript
import { useEffect } from 'react';
import MapView from './components/map/MapView';
import { useGeolocation } from './hooks/useGeolocation';
import { useOpportunities } from './hooks/useOpportunities';

export default function GISPage() {
  const { location: userLocation } = useGeolocation();
  const { filteredOpportunities, fetchNearby, loading } = useOpportunities();

  useEffect(() => {
    if (userLocation) {
      fetchNearby(
        userLocation.latitude,
        userLocation.longitude,
        10  // 10 km radius
      );
    }
  }, [userLocation]);

  return (
    <MapView
      opportunities={filteredOpportunities}
      loading={loading}
      initialLocation={userLocation}
    />
  );
}
```

### Example 2: Filter Opportunities by Sector

```javascript
const { fetchByCategory, filteredOpportunities } = useOpportunities();

// Fetch only construction opportunities
await fetchByCategory('construction');

// filteredOpportunities now contains only construction jobs
```

### Example 3: Calculate Distance Between Two Points

```javascript
import { calculateDistance, formatDistance } from './utils/geoUtils';

const userLat = 3.8480;
const userLon = 11.5021;
const oppLat = 3.9000;
const oppLon = 11.5500;

const distanceKm = calculateDistance(userLat, userLon, oppLat, oppLon);
console.log(formatDistance(distanceKm));  // "7.2 km"
```

### Example 4: Advanced Search

```javascript
const results = await searchOpportunities({
  category: 'construction',
  minSalary: 5000,
  skillLevel: 'semi-skilled',
  durationType: 'permanent',
  sortBy: 'salary'
});
```

---

## Styling & Customization

### Sector Colors

Edit in `config/mapbox.js`:
```javascript
export const SECTOR_COLORS = {
  agriculture: '#2d7a3a',
  construction: '#c45c1a',
  services: '#7c3aed',
  state: '#1a6fa8',
  training: '#f59e0b'
};
```

### Map Style

Change in `config/mapbox.js`:
```javascript
STYLE: 'mapbox://styles/mapbox/light-v11'
// Options: light-v11, dark-v11, satellite-v9, streets-v12
```

### Marker Size

Edit in `OpportunityMarker.css`:
```css
.opportunity-marker {
  width: 40px;  /* Change width */
  height: 40px; /* Change height */
}
```

---

## Performance Optimization

### Marker Clustering (Future)

For large datasets, implement clustering:
```javascript
import MapboxCluster from 'react-cluster-map';
```

### Lazy Loading

Map is already lazy-loaded via route:
```javascript
const MapPage = lazy(() => import('./pages/MapPage'));
```

### Viewport-Based Queries

Instead of fetching all opportunities, query by map bounds:
```javascript
const opportunities = await getOpportunitiesByBounds({
  minLat: 3.80,
  maxLat: 3.90,
  minLon: 11.50,
  maxLon: 11.60
});
```

---

## Troubleshooting

### Mapbox Token Error

**Error:** "Mapbox token not found"
**Solution:** Add VITE_MAPBOX_TOKEN to .env file

### Geolocation Permission Denied

**Error:** "Permission denied"
**Solution:** 
1. Check browser geolocation settings
2. HTTPS is required for geolocation (not HTTP)
3. Falls back to stored location if available

### Opportunities Not Showing

**Check:**
1. Firebase connection is working
2. Opportunities collection has data
3. Layer toggle is enabled for that sector
4. Zoom level is correct (min 5, max 18)

### Map Not Rendering

**Check:**
1. MapView.css is imported
2. mapbox-gl CSS is imported
3. Container has height defined
4. Access token is valid

---

## Next Steps

### Phase 2 Features

1. **Advanced Filtering**
   - Save favorite opportunities
   - Create saved searches
   - Get notifications for new matches

2. **Application System**
   - Submit job applications in-app
   - Track application status
   - Receive messages from employers

3. **User Profiles**
   - Build skill profiles
   - Upload certifications
   - Get recommendations

4. **Analytics Dashboard**
   - Opportunity trends
   - Sector analysis
   - Geographic hotspots

### Production Considerations

1. **Geospatial Database**
   - Migrate to PostGIS for complex queries
   - Implement server-side radius searches
   - Optimize with geohash indexing

2. **Caching**
   - Cache opportunity data
   - Implement service workers
   - Offline map support

3. **Monitoring**
   - Track map performance
   - Monitor API response times
   - User analytics

---

## Resources

- [Mapbox GL JS Documentation](https://docs.mapbox.com/mapbox-gl-js/)
- [react-map-gl](https://visgl.github.io/react-map-gl/)
- [Firebase Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Geospatial Indexing](https://en.wikipedia.org/wiki/Geohash)

---

## Support

For issues or questions, refer to:
- Component JSDoc comments
- Firebase schema documentation
- Utility function docstrings
