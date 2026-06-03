/**
 * useOpportunities Hook
 * Manages fetching, filtering, and sorting opportunities from Firebase
 */

import { useState, useCallback, useEffect } from 'react';
import {
  getAllOpportunities,
  getOpportunitiesByCategory,
  getNearbyOpportunities,
  getOpportunitiesByCommune,
  searchOpportunities,
  getFeaturedOpportunities
} from '../firebase/opportunityService';

export const useOpportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: null,
    searchRadius: 10,
    sortBy: 'distance'
  });

  // Fetch all opportunities
  const fetchAllOpportunities = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllOpportunities();
      setOpportunities(data);
      setFilteredOpportunities(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch opportunities');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch featured opportunities
  const fetchFeaturedOpportunities = useCallback(async (count = 10) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getFeaturedOpportunities(count);
      setOpportunities(data);
      setFilteredOpportunities(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch featured opportunities');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch opportunities by category
  const fetchByCategory = useCallback(async category => {
    setLoading(true);
    setError(null);
    try {
      const data = await getOpportunitiesByCategory(category);
      setOpportunities(data);
      setFilteredOpportunities(data);
      setFilters(prev => ({ ...prev, category }));
    } catch (err) {
      setError(err.message || `Failed to fetch ${category} opportunities`);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch nearby opportunities
  const fetchNearby = useCallback(
    async (userLat, userLon, radiusKm = 10, category = null) => {
      setLoading(true);
      setError(null);
      try {
        const data = await getNearbyOpportunities(userLat, userLon, radiusKm, category);
        setOpportunities(data);
        setFilteredOpportunities(data);
        setFilters(prev => ({
          ...prev,
          searchRadius: radiusKm,
          category
        }));
      } catch (err) {
        setError(err.message || 'Failed to fetch nearby opportunities');
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Fetch opportunities by commune
  const fetchByCommune = useCallback(async (commune, category = null) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getOpportunitiesByCommune(commune, category);
      setOpportunities(data);
      setFilteredOpportunities(data);
    } catch (err) {
      setError(err.message || `Failed to fetch opportunities in ${commune}`);
    } finally {
      setLoading(false);
    }
  }, []);

  // Search opportunities with multiple criteria
  const search = useCallback(async searchFilters => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchOpportunities(searchFilters);
      setOpportunities(data);
      setFilteredOpportunities(data);
      setFilters(prev => ({ ...prev, ...searchFilters }));
    } catch (err) {
      setError(err.message || 'Search failed');
    } finally {
      setLoading(false);
    }
  }, []);

  // Client-side filtering
  const applyFilters = useCallback(filterCriteria => {
    let filtered = [...opportunities];

    if (filterCriteria.category) {
      filtered = filtered.filter(opp => opp.category === filterCriteria.category);
    }

    if (filterCriteria.minSalary) {
      filtered = filtered.filter(
        opp => (opp.compensation?.dailyRate || 0) >= filterCriteria.minSalary
      );
    }

    if (filterCriteria.skillLevel) {
      filtered = filtered.filter(
        opp => opp.jobDetails?.skillLevel === filterCriteria.skillLevel
      );
    }

    if (filterCriteria.withAccommodation) {
      filtered = filtered.filter(opp => opp.support?.accommodation === true);
    }

    setFilteredOpportunities(filtered);
    setFilters(prev => ({ ...prev, ...filterCriteria }));
  }, [opportunities]);

  // Sort opportunities
  const sort = useCallback(sortBy => {
    const sorted = [...filteredOpportunities];

    switch (sortBy) {
      case 'distance':
        sorted.sort((a, b) => (a.distance || 999) - (b.distance || 999));
        break;
      case 'salary':
        sorted.sort(
          (a, b) =>
            (b.compensation?.dailyRate || 0) - (a.compensation?.dailyRate || 0)
        );
        break;
      case 'rating':
        sorted.sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0));
        break;
      case 'recent':
        sorted.sort((a, b) => b.createdAt - a.createdAt);
        break;
      default:
        break;
    }

    setFilteredOpportunities(sorted);
    setFilters(prev => ({ ...prev, sortBy }));
  }, [filteredOpportunities]);

  return {
    opportunities,
    filteredOpportunities,
    loading,
    error,
    filters,
    fetchAllOpportunities,
    fetchFeaturedOpportunities,
    fetchByCategory,
    fetchNearby,
    fetchByCommune,
    search,
    applyFilters,
    sort
  };
};
