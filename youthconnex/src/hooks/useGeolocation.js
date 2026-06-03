/**
 * useGeolocation Hook
 * Manages user's current location and handles geolocation errors.
 *
 * Falls back to a default location (Yaoundé centre) when the browser
 * denies permission or doesn't support geolocation so the map always loads.
 */

import { useState, useEffect } from 'react';

// Default fallback: Yaoundé, Cameroon
const DEFAULT_LOCATION = { latitude: 3.848, longitude: 11.5021 };

export const useGeolocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try stored location first for instant render
    const stored = localStorage.getItem('userLocation');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.latitude && parsed.longitude) {
          setLocation(parsed);
        }
      } catch {
        // ignore corrupt data
      }
    }

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      // Fallback so the map still works
      if (!location) setLocation(DEFAULT_LOCATION);
      setLoading(false);
      return;
    }

    // Success callback
    const handleSuccess = position => {
      const { latitude, longitude } = position.coords;
      const loc = { latitude, longitude };
      setLocation(loc);
      setError(null);
      setLoading(false);
      // Store in localStorage for persistence
      localStorage.setItem('userLocation', JSON.stringify(loc));
    };

    // Error callback — fallback so the map always renders
    const handleError = err => {
      const errorMessages = {
        1: 'Location permission denied — using Yaoundé as default.',
        2: 'Position unavailable — using Yaoundé as default.',
        3: 'Location request timed out — using Yaoundé as default.',
      };
      const msg = errorMessages[err.code] || 'Geolocation error — using default location.';
      setError(msg);

      // Use stored location if available, otherwise default
      const storedLocation = localStorage.getItem('userLocation');
      if (storedLocation) {
        try {
          setLocation(JSON.parse(storedLocation));
        } catch {
          setLocation(DEFAULT_LOCATION);
        }
      } else {
        setLocation(DEFAULT_LOCATION);
      }
      setLoading(false);
    };

    // Request user's location
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
      timeout: 5000,
      enableHighAccuracy: false,
    });
  }, []);

  return { location, error, loading };
};
