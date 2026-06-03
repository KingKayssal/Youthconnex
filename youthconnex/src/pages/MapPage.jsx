/**
 * MapPage Component
 * Main page for the interactive GIS map
 * Integrates MapView with opportunity data, geolocation, and filters
 */

import { useEffect, useState, useRef } from 'react';
import MapView from '../components/map/MapView';
import { useGeolocation } from '../hooks/useGeolocation';
import { useOpportunities } from '../hooks/useOpportunities';
import { useFilters } from '../context/FilterContext';
import Spinner from '../components/ui/Spinner';
import './MapPage.css';

export default function MapPage() {
  const { location: userLocation, error: geoError, loading: geoLoading } = useGeolocation();
  const {
    opportunities,
    filteredOpportunities,
    loading: oppLoading,
    error: oppError,
    fetchAllOpportunities,
    fetchNearby
  } = useOpportunities();

  const {
    searchQuery,
    setSearchQuery,
    category,
    setCategory,
    radius: searchRadius,
    setRadius: setSearchRadius
  } = useFilters();

  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const isFirstRender = useRef(true);

  // Parse URL parameters on initial mount to populate global filters context
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlQ = params.get('q');
    const urlCategory = params.get('category');
    const urlRadius = params.get('radius');

    if (urlQ !== null) {
      setSearchQuery(urlQ);
      setLocalSearch(urlQ);
    }
    if (urlCategory !== null) {
      setCategory(urlCategory || null);
    }
    if (urlRadius !== null) {
      setSearchRadius(Number(urlRadius));
    }
  }, []);

  // Update URL parameters when search filters change
  useEffect(() => {
    // Avoid resetting params on first mount before hydration completes
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (category) params.set('category', category);
    if (searchRadius !== 10) params.set('radius', searchRadius.toString());

    const newQueryString = params.toString();
    const newUrl = `${window.location.pathname}${newQueryString ? '?' + newQueryString : ''}`;
    window.history.replaceState({}, '', newUrl);
  }, [searchQuery, category, searchRadius]);

  // Synchronize local search input when global query changes (e.g. from Home page or reset)
  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  // Fetch opportunities on component mount
  useEffect(() => {
    fetchAllOpportunities();
  }, []);

  // Fetch nearby opportunities when user location is available or radius/category changes
  useEffect(() => {
    if (userLocation?.latitude && userLocation?.longitude) {
      fetchNearby(
        userLocation.latitude,
        userLocation.longitude,
        searchRadius,
        category
      );
    }
  }, [userLocation, searchRadius, category]);

  const handleMarkerClick = opportunity => {
    setSelectedOpportunity(opportunity);
    setShowSidebar(true);
  };

  const handleSearchSubmit = e => {
    e.preventDefault();
    setSearchQuery(localSearch);
  };

  // Perform multi-dimensional client-side filtering on fetched opportunities
  const getFilteredData = () => {
    let list = [...filteredOpportunities];

    // Filter by sector category (in case backend/hook filter is delayed or offline)
    if (category) {
      list = list.filter(opp => opp.category === category);
    }

    // Filter by search keyword/query (title, description, organization, or address)
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        opp =>
          opp.title?.toLowerCase().includes(q) ||
          opp.description?.toLowerCase().includes(q) ||
          opp.organizationName?.toLowerCase().includes(q) ||
          opp.location?.address?.toLowerCase().includes(q)
      );
    }

    return list;
  };

  const displayedOpportunities = getFilteredData();

  // Only block on opportunity loading; geo errors are non-fatal now
  const isLoading = oppLoading || (geoLoading && !userLocation);

  const handleClearFilters = () => {
    setSearchQuery('');
    setCategory(null);
    setLocalSearch('');
  };

  return (
    <div className="mappage-container">
      {/* Map Area */}
      <div className="map-area">
        {isLoading ? (
          <div className="map-loading-state">
            <Spinner message="Loading map and opportunities..." />
          </div>
        ) : oppError ? (
          <div className="map-error-state">
            <h3>Unable to Load Map</h3>
            <p>{oppError}</p>
            <p>Please refresh the page or try again later.</p>
          </div>
        ) : (
          <>
            {/* Geo warning banner (non-blocking) */}
            {geoError && (
              <div className="map-geo-banner">
                ℹ️ {geoError}
              </div>
            )}
            <MapView
              opportunities={displayedOpportunities}
              onMarkerClick={handleMarkerClick}
              loading={false}
              initialLocation={userLocation}
            />
          </>
        )}
      </div>

      {/* Top Toolbar */}
      <div className="map-toolbar">
        <div className="toolbar-content flex flex-wrap md:flex-nowrap gap-4 items-center w-full">
          <form onSubmit={handleSearchSubmit} className="search-section flex items-center gap-2 flex-1">
            <input
              type="text"
              placeholder="Search by keyword, cooperative, or trade..."
              className="search-input py-2 px-3 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white w-full outline-none focus:ring-1 focus:ring-primary"
              value={localSearch}
              onChange={e => setLocalSearch(e.target.value)}
            />
            <button type="submit" className="search-btn bg-primary text-white p-2 rounded-lg text-sm hover:bg-primary-dark transition-colors">
              🔍
            </button>
          </form>

          {/* Sector Selector */}
          <div className="category-section">
            <select
              value={category || ''}
              onChange={e => setCategory(e.target.value || null)}
              className="category-select bg-gray-50 border border-gray-250 rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 outline-none focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer"
            >
              <option value="">All Sectors</option>
              <option value="agriculture">🌱 Agriculture</option>
              <option value="construction">🏗️ Construction</option>
              <option value="services">🛒 Local Services</option>
              <option value="state">🏢 State Projects (HIMO)</option>
              <option value="training">📚 Vocational Training</option>
            </select>
          </div>

          <div className="radius-section flex items-center gap-2">
            <label htmlFor="radius-slider" className="text-xs font-bold text-gray-500 uppercase">Radius:</label>
            <input
              id="radius-slider"
              type="range"
              min="1"
              max="50"
              value={searchRadius}
              onChange={e => setSearchRadius(Number(e.target.value))}
              className="radius-slider cursor-pointer accent-primary"
            />
            <span className="radius-value text-sm font-bold text-primary">{searchRadius} km</span>
          </div>

          {/* Clear Filters Button */}
          {(searchQuery || category) && (
            <button
              onClick={handleClearFilters}
              className="clear-filters-btn text-xs font-semibold text-danger border border-danger/20 hover:bg-danger/5 px-2.5 py-1.5 rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Sidebar with Opportunity Details */}
      {showSidebar && selectedOpportunity && (
        <div className="opportunity-sidebar">
          <div className="sidebar-header">
            <h3>{selectedOpportunity.title}</h3>
            <button
              className="close-sidebar-btn"
              onClick={() => setShowSidebar(false)}
            >
              ✕
            </button>
          </div>

          <div className="sidebar-content">
            {/* Organization */}
            <section className="sidebar-section">
              <h4>Organization</h4>
              <p>{selectedOpportunity.organizationName}</p>
              {selectedOpportunity.contactInfo?.phone && (
                <p className="contact-info">
                  📞 {selectedOpportunity.contactInfo.phone}
                </p>
              )}
            </section>

            {/* Location */}
            <section className="sidebar-section">
              <h4>Location</h4>
              <p>{selectedOpportunity.location?.address}</p>
              {selectedOpportunity.distance && (
                <p className="distance-info">
                  📍 {selectedOpportunity.distance.toFixed(1)} km away
                </p>
              )}
            </section>

            {/* Job Details */}
            {selectedOpportunity.jobDetails && (
              <section className="sidebar-section">
                <h4>Job Details</h4>
                <ul>
                  <li>
                    <strong>Vacancies:</strong>{' '}
                    {selectedOpportunity.jobDetails.vacancies}
                  </li>
                  <li>
                    <strong>Skill Level:</strong>{' '}
                    {selectedOpportunity.jobDetails.skillLevel}
                  </li>
                  {selectedOpportunity.jobDetails.requiredSkills?.length > 0 && (
                    <li>
                      <strong>Required Skills:</strong>{' '}
                      {selectedOpportunity.jobDetails.requiredSkills.join(', ')}
                    </li>
                  )}
                </ul>
              </section>
            )}

            {/* Compensation */}
            {selectedOpportunity.compensation && (
              <section className="sidebar-section">
                <h4>Compensation</h4>
                <p>
                  <strong>
                    {selectedOpportunity.compensation.currency || 'FCFA'}{' '}
                    {selectedOpportunity.compensation.dailyRate?.toLocaleString()}
                  </strong>
                  {' per day'}
                </p>
              </section>
            )}

            {/* Rating */}
            {selectedOpportunity.rating?.average && (
              <section className="sidebar-section">
                <h4>Rating</h4>
                <p>
                  ⭐ {selectedOpportunity.rating.average.toFixed(1)} / 5 (
                  {selectedOpportunity.rating.count} reviews)
                </p>
              </section>
            )}

            {/* Actions */}
            <div className="sidebar-actions">
              <button className="btn-primary">Express Interest</button>
              <button className="btn-secondary">View Full Details</button>
            </div>
          </div>
        </div>
      )}

      {/* Status Bar */}
      <div className="map-status-bar">
        <div className="status-content">
          <span>
            Showing {displayedOpportunities.length} of {opportunities.length}{' '}
            opportunities
          </span>
          {userLocation && (
            <span className="location-badge">
              ✓ Location enabled ({userLocation.latitude.toFixed(2)},{' '}
              {userLocation.longitude.toFixed(2)})
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
