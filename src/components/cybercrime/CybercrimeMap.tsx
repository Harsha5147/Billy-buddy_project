import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { Report } from '../../types';
import { MAP_CONFIG } from '../../config/mapConfig';
import 'leaflet/dist/leaflet.css';

interface CybercrimeMapProps {
  reports: Report[];
  criticalAreas: any[];
}

const CybercrimeMap: React.FC<CybercrimeMapProps> = ({ reports, criticalAreas }) => {
  const getMarkerColor = (severity: string) => {
    switch (severity) {
      case 'critical': return '#DC2626';
      case 'high': return '#EA580C';
      default: return '#2563EB';
    }
  };

  return (
    <MapContainer
      center={[MAP_CONFIG.center[0], MAP_CONFIG.center[1]]}
      zoom={MAP_CONFIG.zoom}
      className="h-full w-full"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {criticalAreas.map((area, index) => (
        <CircleMarker
          key={index}
          center={[area.location.lat, area.location.lng]}
          radius={Math.min(area.count * 3, 20)}
          fillColor={getMarkerColor(area.severity)}
          color={getMarkerColor(area.severity)}
          weight={2}
          opacity={0.8}
          fillOpacity={0.4}
        >
          <Popup>
            <div className="p-3">
              <h3 className="font-bold text-lg mb-2">
                {area.location.city}, {area.location.state}
              </h3>
              <p className="text-red-600 font-semibold mb-2">
                {area.count} Reports of {area.type}
              </p>
              <p className="text-sm text-gray-600">
                Severity Level: <span className="font-semibold capitalize">{area.severity}</span>
              </p>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
};

export default CybercrimeMap;