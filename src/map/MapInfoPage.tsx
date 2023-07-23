import React from 'react';
import MapBoardListPage from './boardMapPage/MapBoardListPage';

interface Place {
  place_name: string;
  address_name: string;
  phone: string;
}

interface MapInfoPageProps {
  place: Place | null;
  onClose: () => void;
}

const MapInfoPage: React.FC<MapInfoPageProps> = ({ place, onClose }) => {
  if (!place) {
    return null;
  }

  return (
    <div>
      <div style={{ padding: '20px', border: '1px solid #ccc', backgroundColor: '#fff' }}>
        <h2>{place.place_name}</h2>
        <p>주소: {place.address_name}</p>
        <p>전화번호: {place.phone}</p>
      </div>
      <MapBoardListPage/>
    </div>
  );
};

export default MapInfoPage;