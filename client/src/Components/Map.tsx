import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import ChangeMapView from './ChangeMapView';

interface MapProps {
  coordinates: [number, number][];
  parkNames: string[];
  selectedPark: number | null; // Index of the selected park
}

const Map: React.FC<MapProps> = ({ coordinates, parkNames, selectedPark }) => {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {coordinates.map((coord, index) => (
        <Marker key={index} position={coord}>
          <Popup>{parkNames[index]}</Popup>
        </Marker>
      ))}
      {selectedPark !== null && coordinates[selectedPark] && (
        <ChangeMapView coords={coordinates[selectedPark]} />
      )}
    </MapContainer>
  );
}

export default Map;
