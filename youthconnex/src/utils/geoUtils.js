/**
 * Geospatial Utilities
 * Functions for distance calculations, geohash generation, and nearby searches
 */

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param {number} lat1 - User latitude
 * @param {number} lon1 - User longitude
 * @param {number} lat2 - Opportunity latitude
 * @param {number} lon2 - Opportunity longitude
 * @returns {number} Distance in kilometers
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance * 10) / 10; // Round to 1 decimal place
};

/**
 * Simple geohash generator (Interleaved latitude/longitude bits)
 * Limited to ~2.4km precision for simplicity
 * For production, use geofire-common
 * @param {number} latitude
 * @param {number} longitude
 * @param {number} precision - Number of characters (default 6 for ~2.4km)
 * @returns {string} Geohash string
 */
export const generateGeohash = (latitude, longitude, precision = 6) => {
  const BASE32 = '0123456789bcdefghjkmnpqrstuvwxyz';
  let lat = [-90, 90];
  let lon = [-180, 180];
  let geohash = '';
  let isEvenBit = true;
  let bit = 0;
  let ch = 0;

  while (geohash.length < precision) {
    if (isEvenBit) {
      const mid = (lon[0] + lon[1]) / 2;
      if (longitude > mid) {
        ch |= 1 << (4 - bit);
        lon[0] = mid;
      } else {
        lon[1] = mid;
      }
    } else {
      const mid = (lat[0] + lat[1]) / 2;
      if (latitude > mid) {
        ch |= 1 << (4 - bit);
        lat[0] = mid;
      } else {
        lat[1] = mid;
      }
    }

    isEvenBit = !isEvenBit;
    if (bit < 4) {
      bit++;
    } else {
      geohash += BASE32[ch];
      bit = 0;
      ch = 0;
    }
  }

  return geohash;
};

/**
 * Filter opportunities within a specified radius
 * @param {Array} opportunities - Array of opportunity objects
 * @param {number} userLat - User latitude
 * @param {number} userLon - User longitude
 * @param {number} radiusKm - Search radius in kilometers
 * @returns {Array} Filtered opportunities with distance calculated
 */
export const filterNearbyOpportunities = (
  opportunities,
  userLat,
  userLon,
  radiusKm = 10
) => {
  return opportunities
    .map(opp => ({
      ...opp,
      distance: calculateDistance(
        userLat,
        userLon,
        opp.location.latitude,
        opp.location.longitude
      )
    }))
    .filter(opp => opp.distance <= radiusKm)
    .sort((a, b) => a.distance - b.distance);
};

/**
 * Generate bounds for rectangular search area
 * Useful for viewport-based queries
 * @param {number} centerLat
 * @param {number} centerLon
 * @param {number} radiusKm
 * @returns {Object} Bounds object with min/max lat/lon
 */
export const generateSearchBounds = (centerLat, centerLon, radiusKm) => {
  const latChange = radiusKm / 111; // 1 degree latitude ≈ 111 km
  const lonChange = radiusKm / (111 * Math.cos((centerLat * Math.PI) / 180));

  return {
    minLat: centerLat - latChange,
    maxLat: centerLat + latChange,
    minLon: centerLon - lonChange,
    maxLon: centerLon + lonChange,
    radius: radiusKm
  };
};

/**
 * Group opportunities by geographic cluster
 * Useful for map clustering/heatmaps
 * @param {Array} opportunities
 * @param {number} clusterRadiusKm - Radius for clustering
 * @returns {Array} Array of clusters with center point and opportunities
 */
export const clusterOpportunities = (opportunities, clusterRadiusKm = 2) => {
  if (!opportunities.length) return [];

  const clusters = [];
  const visited = new Set();

  opportunities.forEach((opp, idx) => {
    if (visited.has(idx)) return;

    const cluster = [opp];
    visited.add(idx);

    opportunities.forEach((other, otherIdx) => {
      if (visited.has(otherIdx)) return;

      const distance = calculateDistance(
        opp.location.latitude,
        opp.location.longitude,
        other.location.latitude,
        other.location.longitude
      );

      if (distance <= clusterRadiusKm) {
        cluster.push(other);
        visited.add(otherIdx);
      }
    });

    // Calculate cluster center
    const centerLat =
      cluster.reduce((sum, opp) => sum + opp.location.latitude, 0) /
      cluster.length;
    const centerLon =
      cluster.reduce((sum, opp) => sum + opp.location.longitude, 0) /
      cluster.length;

    clusters.push({
      id: `cluster_${clusters.length}`,
      center: { latitude: centerLat, longitude: centerLon },
      opportunities: cluster,
      count: cluster.length
    });
  });

  return clusters;
};

/**
 * Sort opportunities by distance and other criteria
 * @param {Array} opportunities
 * @param {string} sortBy - 'distance' | 'rating' | 'vacancies' | 'recent'
 * @returns {Array} Sorted opportunities
 */
export const sortOpportunities = (opportunities, sortBy = 'distance') => {
  const sorted = [...opportunities];

  switch (sortBy) {
    case 'distance':
      return sorted.sort((a, b) => (a.distance || 999) - (b.distance || 999));

    case 'rating':
      return sorted.sort(
        (a, b) => (b.rating?.average || 0) - (a.rating?.average || 0)
      );

    case 'vacancies':
      return sorted.sort(
        (a, b) => (b.jobDetails?.vacancies || 0) - (a.jobDetails?.vacancies || 0)
      );

    case 'recent':
      return sorted.sort((a, b) => b.createdAt - a.createdAt);

    default:
      return sorted;
  }
};

/**
 * Get nearby commune/administrative region
 * Useful for filtering by locality
 * @param {number} latitude
 * @param {number} longitude
 * @param {Array} communes - Array of commune boundaries
 * @returns {Object} Nearest commune information
 */
export const findNearestCommune = (latitude, longitude, communes = []) => {
  if (!communes.length) return null;

  let nearest = communes[0];
  let minDistance = calculateDistance(
    latitude,
    longitude,
    communes[0].location.latitude,
    communes[0].location.longitude
  );

  communes.forEach(commune => {
    const distance = calculateDistance(
      latitude,
      longitude,
      commune.location.latitude,
      commune.location.longitude
    );

    if (distance < minDistance) {
      minDistance = distance;
      nearest = commune;
    }
  });

  return nearest;
};

/**
 * Format distance for display
 * @param {number} distanceKm
 * @returns {string} Formatted distance string
 */
export const formatDistance = distanceKm => {
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)}m`;
  }
  return `${distanceKm.toFixed(1)} km`;
};

/**
 * Validate coordinates
 * @param {number} latitude
 * @param {number} longitude
 * @returns {boolean} True if coordinates are valid
 */
export const isValidCoordinates = (latitude, longitude) => {
  return (
    typeof latitude === 'number' &&
    typeof longitude === 'number' &&
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180
  );
};

/**
 * Convert degrees to radians
 */
const toRadians = degrees => degrees * (Math.PI / 180);

/**
 * Check if a point is within a radius (simplified)
 * @param {number} centerLat
 * @param {number} centerLon
 * @param {number} pointLat
 * @param {number} pointLon
 * @param {number} radiusKm
 * @returns {boolean} True if point is within radius
 */
export const isPointWithinRadius = (
  centerLat,
  centerLon,
  pointLat,
  pointLon,
  radiusKm
) => {
  const distance = calculateDistance(centerLat, centerLon, pointLat, pointLon);
  return distance <= radiusKm;
};
