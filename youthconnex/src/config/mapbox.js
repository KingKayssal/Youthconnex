/**
 * Mapbox Configuration
 * Sets up Mapbox access token and default map settings
 */

export const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export const MAPBOX_CONFIG = {
  TOKEN: MAPBOX_TOKEN,
  STYLE: 'mapbox://styles/mapbox/light-v11',
  DEFAULT_CENTER: [11.5021, 3.8480], // [lng, lat] - Yaoundé, Cameroon
  DEFAULT_ZOOM: 10,
  MIN_ZOOM: 5,
  MAX_ZOOM: 18,
};

export const SECTOR_COLORS = {
  agriculture: '#2d7a3a',
  construction: '#c45c1a',
  services: '#7c3aed',
  state: '#1a6fa8',
  training: '#f59e0b',
};

export const SECTOR_ICONS = {
  agriculture: '🌱',
  construction: '🏗️',
  services: '🛠️',
  state: '🏢',
  training: '📚',
};

export const SECTOR_LABELS = {
  agriculture: 'Agriculture & Cooperatives',
  construction: 'Construction Sites',
  services: 'Informal Services',
  state: 'State HIMO Projects',
  training: 'Training Centers',
};

// Geospatial configuration
export const GEO_CONFIG = {
  EARTH_RADIUS_KM: 6371,
  DEFAULT_RADIUS_KM: 10,
  CLUSTER_RADIUS: 80,
  CLUSTER_MAX_ZOOM: 14,
};

// Validation helper
export const validateMapboxToken = () => {
  if (!MAPBOX_TOKEN) {
    console.error(
      'Mapbox token not found. Add VITE_MAPBOX_TOKEN to your .env file'
    );
    return false;
  }
  if (MAPBOX_TOKEN === 'your-mapbox-token' || MAPBOX_TOKEN.trim() === '') {
    console.error(
      'Invalid Mapbox token. Please add a valid token to VITE_MAPBOX_TOKEN in .env'
    );
    return false;
  }
  return true;
};
