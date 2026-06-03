/**
 * MapPopup Component
 * Displays detailed information when a marker is clicked
 */

import { Popup } from 'react-map-gl';
import { formatDistance } from '../../utils/geoUtils';
import { SECTOR_COLORS, SECTOR_LABELS } from '../../config/mapbox';
import './MapPopup.css';

export default function MapPopup({ opportunity, onClose = () => {} }) {
  const {
    id,
    title,
    location,
    category,
    organizationName,
    jobDetails,
    compensation,
    distance,
    rating,
    support
  } = opportunity;

  const color = SECTOR_COLORS[category] || '#666';
  const label = SECTOR_LABELS[category] || category;

  return (
    <Popup
      longitude={location.longitude}
      latitude={location.latitude}
      anchor="bottom"
      onClose={onClose}
      closeOnClick={false}
      className="opportunity-popup"
    >
      <div className="popup-content">
        {/* Header */}
        <div className="popup-header">
          <h3 className="popup-title">{title}</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {/* Organization */}
        <div className="popup-org">{organizationName}</div>

        {/* Category Badge */}
        <span className="category-badge" style={{ backgroundColor: color }}>
          {label}
        </span>

        {/* Location & Distance */}
        <div className="popup-row">
          <span className="icon">📍</span>
          <span>
            {location.address}
            {distance && <span className="distance"> ({formatDistance(distance)})</span>}
          </span>
        </div>

        {/* Job Details */}
        {jobDetails?.vacancies && (
          <div className="popup-row">
            <span className="icon">👥</span>
            <span>{jobDetails.vacancies} positions available</span>
          </div>
        )}

        {/* Compensation */}
        {compensation?.dailyRate && (
          <div className="popup-row">
            <span className="icon">💰</span>
            <span>
              {compensation.currency} {compensation.dailyRate.toLocaleString()} /day
            </span>
          </div>
        )}

        {/* Rating */}
        {rating?.average && (
          <div className="popup-row">
            <span className="icon">⭐</span>
            <span>
              {rating.average.toFixed(1)}/5 ({rating.count} reviews)
            </span>
          </div>
        )}

        {/* Support Services */}
        {(support?.accommodation || support?.meals || support?.transport || support?.ppe_provided) && (
          <div className="popup-row support-row">
            <span className="icon">🛟</span>
            <div className="support-items">
              {support.accommodation && <span className="support-badge">🏠 Accommodation</span>}
              {support.meals && <span className="support-badge">🍽️ Meals</span>}
              {support.transport && <span className="support-badge">🚗 Transport</span>}
              {support.ppe_provided && <span className="support-badge">👷 PPE</span>}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="popup-actions">
          <button className="btn-primary" style={{ backgroundColor: color }}>
            Express Interest
          </button>
          <button className="btn-secondary">
            Details →
          </button>
        </div>
      </div>
    </Popup>
  );
}
