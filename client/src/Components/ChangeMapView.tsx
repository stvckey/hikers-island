import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';

interface ChangeMapViewProps {
  coords: [number, number];
}

const ChangeMapView: React.FC<ChangeMapViewProps> = ({ coords }) => {
  const map = useMap();

  useEffect(() => {
    if (coords) {
      map.setView(coords, 13, { animate: true });
    }
  }, [coords, map]);

  return null;
};

export default ChangeMapView;
