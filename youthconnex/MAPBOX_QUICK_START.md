# YouthConnex Mapbox Integration - Quick Start Guide

## ✅ Pre-Integration Checklist

Before starting, ensure you have:
- [ ] Node.js 16+ installed
- [ ] React 19+ project with Vite
- [ ] Firebase project created and configured
- [ ] Basic understanding of React hooks
- [ ] npm or yarn package manager

---

## 🚀 Installation Steps (5 minutes)

### Step 1: Install Dependencies
```bash
cd frontend
npm install mapbox-gl react-map-gl geofire-common
```

### Step 2: Get Mapbox Access Token
1. Visit https://mapbox.com
2. Sign up (free account includes $200/month credits)
3. Go to Account → Tokens
4. Copy the **Default public token**

### Step 3: Update .env File
Add to `frontend/.env`:
```env
VITE_MAPBOX_TOKEN=pk.eyJ...your_actual_token...
```

### Step 4: Verify Firebase Configuration
Check that `.env` has:
```env
VITE_FIREBASE_API_KEY=your-actual-key
VITE_FIREBASE_PROJECT_ID=your-project-id
# ... other Firebase variables
```

### Step 5: Start Development Server
```bash
npm run dev
```

Visit `http://localhost:5173/map` to see the map!

---

## 📁 File Structure Created

```
✓ src/config/mapbox.js                    - Mapbox configuration
✓ src/firebase/schema.js                  - Firebase schema docs
✓ src/firebase/opportunityService.js      - Geospatial queries
✓ src/utils/geoUtils.js                   - Distance calculations
✓ src/hooks/useGeolocation.js             - Location hook
✓ src/hooks/useOpportunities.js           - Data fetching hook
✓ src/components/map/MapView.jsx          - Main map component
✓ src/components/map/OpportunityMarker.jsx - Markers
✓ src/components/map/MapPopup.jsx         - Popups
✓ src/components/map/LayerControls.jsx    - Sector toggles
✓ src/components/map/*.css                - Styling
✓ src/pages/MapPage.jsx                   - Map page
✓ src/firebase/sampleData.js              - Test data
✓ MAPBOX_INTEGRATION_GUIDE.md             - Full documentation
```

---

## 🧪 Testing the Integration

### Test 1: Load the Map
1. Go to `http://localhost:5173/map`
2. You should see:
   - ✓ Interactive Mapbox map centered on Yaoundé
   - ✓ Layer controls in top-right
   - ✓ Navigation controls in top-left
   - ✓ Geolocation button in top-left

### Test 2: Populate with Sample Data

#### Option A: Use the Seeder Script
```javascript
// In your browser console, navigate to map page, then:
import('./firebase/sampleData.js').then(m => m.seedSampleData());
```

#### Option B: Manual Firebase Entry
Create documents manually in Firestore at `/opportunities/{docId}`

### Test 3: Verify Map Markers
After seeding data:
1. Map should show colored pins
2. Pin colors represent sectors:
   - 🟢 Green = Agriculture
   - 🟠 Orange = Construction
   - 🟣 Purple = Services
   - 🔵 Blue = State HIMO

### Test 4: Test Interactions
- [ ] Click a marker → Popup appears
- [ ] Click popup close button → Popup disappears
- [ ] Toggle sector checkbox → Markers hide/show
- [ ] Use zoom controls → Map zooms in/out
- [ ] Click geolocation button → Map centers on your location

---

## 🔧 Configuration Options

### Change Map Center/Zoom
Edit `src/config/mapbox.js`:
```javascript
DEFAULT_CENTER: [11.5021, 3.8480],  // [longitude, latitude]
DEFAULT_ZOOM: 10
```

### Change Sector Colors
Edit `src/config/mapbox.js`:
```javascript
export const SECTOR_COLORS = {
  agriculture: '#2d7a3a',     // Green
  construction: '#c45c1a',    // Orange
  services: '#7c3aed',        // Purple
  state: '#1a6fa8',           // Blue
  training: '#f59e0b'         // Amber
};
```

### Change Map Style
Edit `src/config/mapbox.js`:
```javascript
// Options: light-v11, dark-v11, satellite-v9, streets-v12
STYLE: 'mapbox://styles/mapbox/light-v11'
```

---

## 📊 Adding Your Own Data

### Method 1: Use Sample Seeder
```javascript
import { seedSampleData } from './firebase/sampleData';

// In your component or console:
await seedSampleData();
```

### Method 2: Create Opportunities Manually
```javascript
import { createOpportunity } from './firebase/opportunityService';

const newOpp = {
  title: 'Example Job',
  category: 'agriculture',
  location: {
    latitude: 3.8480,
    longitude: 11.5021,
    address: 'Yaoundé',
    administrativeLevel: {
      region: 'Centre',
      commune: 'Yaoundé'
    }
  },
  organizationName: 'My Organization',
  jobDetails: { vacancies: 5, skillLevel: 'unskilled' },
  compensation: { currency: 'FCFA', dailyRate: 5000 },
  status: 'open'
};

const docId = await createOpportunity(newOpp);
console.log('Created:', docId);
```

### Method 3: Manual Firestore Entry
1. Go to Firebase Console
2. Firestore Database → Opportunities collection
3. Add document with schema from `firebase/schema.js`

---

## 🐛 Troubleshooting

### Problem: "Mapbox token not found"
**Solution:**
```bash
# 1. Check .env file has:
echo VITE_MAPBOX_TOKEN

# 2. Restart dev server:
npm run dev

# 3. Verify token format: pk.eyJ...
```

### Problem: Map not showing
**Solutions:**
1. Check browser console for errors
2. Verify MapView.css is imported
3. Check container has height
4. Ensure token is valid

### Problem: No markers appearing
**Solutions:**
1. Check opportunities exist in Firestore
2. Verify coordinates are valid (lat: -90 to 90, lon: -180 to 180)
3. Check zoom level (min: 5, max: 18)
4. Verify layer toggle is enabled for that sector

### Problem: "Permission denied" for geolocation
**Solutions:**
1. Check browser geolocation settings
2. HTTPS required (except localhost)
3. Allow location in browser permissions
4. Manually set initial location

---

## 📈 Next Steps

### Short Term (Phase 1 - Already Done!)
- ✅ Mapbox integration
- ✅ Interactive map rendering
- ✅ Opportunity display with markers
- ✅ Layer filtering (by sector)
- ✅ Geospatial utilities
- ✅ Firebase schema

### Medium Term (Phase 2 - Recommended Next)
- [ ] Advanced filtering UI
- [ ] Save favorite opportunities
- [ ] Application submission system
- [ ] Search bar integration
- [ ] User profile builder
- [ ] Radius selector UI improvement

### Long Term (Phase 3 - Future)
- [ ] Server-side geospatial queries
- [ ] Marker clustering for many opportunities
- [ ] Heatmap visualization
- [ ] Analytics dashboard
- [ ] Notification system
- [ ] Mobile app (React Native)

---

## 🎯 Key Features Implementation

### Already Working
✅ Interactive map with Mapbox GL  
✅ Colored markers by sector  
✅ Click marker → show details popup  
✅ Toggle sector visibility  
✅ Distance calculations  
✅ Nearby opportunity search  
✅ Geolocation tracking  

### To Build Next
- [ ] Search bar
- [ ] Radius selector with visual ring
- [ ] Sidebar with opportunity list
- [ ] Application submission
- [ ] Saved opportunities
- [ ] User profiles
- [ ] Ratings and reviews

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| [MAPBOX_INTEGRATION_GUIDE.md](./MAPBOX_INTEGRATION_GUIDE.md) | Comprehensive technical guide |
| [src/firebase/schema.js](./src/firebase/schema.js) | Firebase schema definitions |
| [src/utils/geoUtils.js](./src/utils/geoUtils.js) | Geospatial utility functions |
| [src/firebase/opportunityService.js](./src/firebase/opportunityService.js) | Firebase queries |
| Component JSDoc | In-code documentation |

---

## 🤝 Community Resources

- [Mapbox GL JS Docs](https://docs.mapbox.com/mapbox-gl-js/)
- [react-map-gl Documentation](https://visgl.github.io/react-map-gl/)
- [Firebase Firestore Docs](https://firebase.google.com/docs/firestore)
- [React Hooks Documentation](https://react.dev/reference/react)

---

## ✅ Deployment Checklist

Before deploying to production:

- [ ] Replace sample data with real opportunities
- [ ] Verify Firebase security rules
- [ ] Test with real Mapbox token (production)
- [ ] Add error handling for failed geolocation
- [ ] Test on mobile devices
- [ ] Verify HTTPS for geolocation
- [ ] Set up analytics tracking
- [ ] Test with slow network (DevTools throttling)
- [ ] Verify map styling matches brand
- [ ] Load test with many opportunities

---

## 💡 Pro Tips

### Tip 1: Debug Geolocation
```javascript
// In browser console:
navigator.geolocation.getCurrentPosition(
  pos => console.log(pos.coords),
  err => console.error(err)
);
```

### Tip 2: Check Mapbox Token Validity
```javascript
// Visit in browser:
https://api.mapbox.com/v4/mapbox.mapbox-streets-v7/0/0/0.png?access_token=YOUR_TOKEN
// Should return an image, not an error
```

### Tip 3: Monitor Firestore Usage
Go to Firebase Console → Usage → Firestore to see:
- Reads, writes, deletes
- Storage usage
- Cost breakdown

### Tip 4: Test Offline
```bash
# DevTools → Network → Offline
# Then reload to test offline handling
```

---

## 🚀 You're All Set!

Your Mapbox integration is ready! The map is now live at `/map` route.

**Next:** 
1. Seed some sample data
2. Test interactions
3. Read the full guide
4. Start building Phase 2 features

**Questions?** Check MAPBOX_INTEGRATION_GUIDE.md for detailed docs.

Happy mapping! 🗺️
