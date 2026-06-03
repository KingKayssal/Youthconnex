/**
 * MapView Component
 * Main interactive Mapbox GL map component for YouthConnex
 * Displays opportunities as markers and handles user interactions
 */

import { useState, useEffect, useRef } from 'react';
import Map, { Marker, Popup, NavigationControl, GeolocateControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MAPBOX_CONFIG, validateMapboxToken, SECTOR_COLORS } from '../../config/mapbox';
import OpportunityMarker from './OpportunityMarker';
import MapPopup from './MapPopup';
import LayerControls from './LayerControls';
import './MapView.css';

export default function MapView({ 
  opportunities = [], 
  onMarkerClick = () => {}, 
  loading = false,
  initialLocation = null 
}) {
  // Validate Mapbox token
  if (!validateMapboxToken()) {
    return (
      <div className="map-error">
        <h3>⚠️ Mapbox Configuration Error</h3>
        <p>Please add your Mapbox access token to the .env file:</p>
        <code>VITE_MAPBOX_TOKEN=your_token_here</code>
        <p>Get a free token at: <a href="https://mapbox.com" target="_blank" rel="noreferrer">mapbox.com</a></p>
      </div>
    );
  }

  // State management
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [activeLayers, setActiveLayers] = useState({
    agriculture: true,
    construction: true,
    services: true,
    state: true,
    training: true
  });
  const [viewState, setViewState] = useState({
    longitude: MAPBOX_CONFIG.DEFAULT_CENTER[0],
    latitude: MAPBOX_CONFIG.DEFAULT_CENTER[1],
    zoom: MAPBOX_CONFIG.DEFAULT_ZOOM,
    bearing: 0,
    pitch: 0
  });

  const mapRef = useRef(null);

  // Update map center when user location is available
  useEffect(() => {
    if (initialLocation?.latitude && initialLocation?.longitude) {
      setViewState(prev => ({
        ...prev,
        latitude: initialLocation.latitude,
        longitude: initialLocation.longitude,
        zoom: 12
      }));
    }
  }, [initialLocation]);

  // Handle marker click
  const handleMarkerClick = (opportunity) => {
    setSelectedMarker(opportunity);
    onMarkerClick(opportunity);
  };

  // Handle layer toggle
  const handleLayerToggle = (category) => {
    setActiveLayers(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Filter opportunities based on active layers — show by default unless explicitly off
  const visibleOpportunities = opportunities.filter(
    opp => activeLayers[opp.category] !== false
  );

  return (
    <div className="mapview-container">
      {/* Layer Controls */}
      <LayerControls 
        activeLayers={activeLayers}
        onLayerToggle={handleLayerToggle}
      />

      {/* Loading indicator */}
      {loading && (
        <div className="map-loading">
          <div className="spinner"></div>
          <p>Loading opportunities...</p>
        </div>
      )}

      {/* Mapbox Map */}
      <Map
        ref={mapRef}
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapboxAccessToken={MAPBOX_CONFIG.TOKEN}
        mapStyle={MAPBOX_CONFIG.STYLE}
        style={{ width: '100%', height: '100%' }}
        minZoom={MAPBOX_CONFIG.MIN_ZOOM}
        maxZoom={MAPBOX_CONFIG.MAX_ZOOM}
      >
        {/* Navigation Controls */}
        <NavigationControl position="top-left" showCompass={true} />

        {/* Geolocate Control */}
        <GeolocateControl
          position="top-left"
          trackUserLocation={true}
          showUserHeading={true}
        />

        {/* Render Opportunity Markers */}
        {visibleOpportunities.map(opportunity => (
          <OpportunityMarker
            key={opportunity.id}
            opportunity={opportunity}
            isSelected={selectedMarker?.id === opportunity.id}
            onClick={() => handleMarkerClick(opportunity)}
          />
        ))}

        {/* Selected Marker Popup */}
        {selectedMarker && (
          <MapPopup
            opportunity={selectedMarker}
            onClose={() => setSelectedMarker(null)}
          />
        )}
      </Map>

      {/* Map Info */}
      <div className="map-info">
        <p>
          Showing {visibleOpportunities.length} of {opportunities.length} opportunities
        </p>
      </div>
    </div>
  );
}
