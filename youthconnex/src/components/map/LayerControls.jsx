/**
 * LayerControls Component
 * Toggle visibility of different opportunity sectors on the map
 */

import { SECTOR_COLORS, SECTOR_LABELS } from '../../config/mapbox';
import './LayerControls.css';

export default function LayerControls({ activeLayers = {}, onLayerToggle = () => {} }) {
  const categories = Object.keys(SECTOR_LABELS);

  return (
    <div className="layer-controls">
      <div className="controls-header">
        <h4>Sectors</h4>
      </div>

      <div className="controls-list">
        {categories.map(category => (
          <label key={category} className="control-item">
            <input
              type="checkbox"
              checked={activeLayers[category] !== false}
              onChange={() => onLayerToggle(category)}
              className="control-checkbox"
            />
            <span className="control-label">
              <span
                className="color-dot"
                style={{ backgroundColor: SECTOR_COLORS[category] }}
              ></span>
              {SECTOR_LABELS[category]}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
