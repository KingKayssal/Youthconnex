/**
 * OpportunityMarker Component
 * Individual marker for each opportunity on the map
 */

import { Marker } from 'react-map-gl';
import { SECTOR_COLORS, SECTOR_ICONS } from '../../config/mapbox';
import './OpportunityMarker.css';

export default function OpportunityMarker({ 
  opportunity, 
  isSelected = false, 
  onClick = () => {} 
}) {
  const { location, category, title } = opportunity;
  
  if (!location?.latitude || !location?.longitude) {
    console.warn('Invalid coordinates for opportunity:', opportunity.id);
    return null;
  }

  const color = SECTOR_COLORS[category] || '#666';
  const icon = SECTOR_ICONS[category] || '📍';

  return (
    <Marker
      longitude={location.longitude}
      latitude={location.latitude}
      anchor="bottom"
      onClick={() => onClick()}
    >
      <div
        className={`opportunity-marker ${isSelected ? 'selected' : ''}`}
        style={{
          backgroundColor: color,
          cursor: 'pointer',
          borderRadius: '50% 50% 50% 0',
          transform: `rotate(-45deg) ${isSelected ? 'scale(1.3)' : 'scale(1)'}`,
          transition: 'transform 0.2s ease'
        }}
        title={title}
      >
        <div className="marker-icon" style={{ transform: 'rotate(45deg)' }}>
          {icon}
        </div>
      </div>
    </Marker>
  );
}
