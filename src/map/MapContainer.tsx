import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';
import MapInfoPage from './MapInfoPage';
import { useNavigate } from 'react-router-dom';
import './boardMapPage/css/MapCss.css'

declare global {
  interface Window {
    kakao: any;
  }
}

const Map = styled.div`
  width: 100%;
  height: 300px;
`;

const PopupContainer = styled.div`
  position: absolute;
  bottom: 310;
  left: 50%;
  transform: translateX(-50%);
  padding: 20px; /* 팝업창의 내용 여백 조정 */
  background-color: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  z-index: 1;
  width: 80%;
`;

interface Place {
  place_name: string;
  address_name: string;
  phone: string;
  x: number;
  y: number;
}

function MapContainer() {
  const [keyword, setKeyword] = useState<string>('');
  const [places, setPlaces] = useState<Place[]>([]);
  const mapRef = useRef<HTMLDivElement>(null);
  const markers: any[] = [];
  const bounds = new window.kakao.maps.LatLngBounds();
  const navigate = useNavigate();

  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [showMapInfoPage, setShowMapInfoPage] = useState<boolean>(false);

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) {
      console.error('카카오 맵 라이브러리가 로드되지 않았습니다.');
      return;
    }

    const container = mapRef.current;
    const options = {
      center: new window.kakao.maps.LatLng(37.501229, 127.037217),
      level: 3,
    };
    const map = new window.kakao.maps.Map(container, options);

    if (keyword !== '') {
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(keyword, (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const { x, y } = result[0];
          map.panTo(new window.kakao.maps.LatLng(y, x));

          const placesService = new window.kakao.maps.services.Places();
          placesService.keywordSearch(
            '동물병원',
            (data: any, status: any) => placesSearchCB(data, status, map, y, x),
            { location: new window.kakao.maps.LatLng(y, x) }
          );
        }
      });
    }
  }, [keyword]);

  function placesSearchCB(data: any, status: any, map: any, latitude: number, longitude: number) {
    if (status === window.kakao.maps.services.Status.OK) {
      setPlaces(data);

      data.forEach((place: any) => {
        const markerPosition = new window.kakao.maps.LatLng(place.y, place.x);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });

        window.kakao.maps.event.addListener(marker, 'click', () => handleMarkerClick(place));

        marker.setMap(map);
        markers.push(marker);
        bounds.extend(markerPosition);
      });

      map.setBounds(bounds);
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      setPlaces([]);
    }
  }

  function handleMarkerClick(place: any) {
    setSelectedPlace(place);
    setShowMapInfoPage(true);

    const newPath = `/map/boardMapList/${encodeURIComponent(place.place_name)}`;
    window.history.replaceState({}, '', newPath);
  }
  
  function handleCloseMapInfoPage() {
    setShowMapInfoPage(false);
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <input className='mapbar'
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="지역명을 입력하세요"
        />
      </div>
      <Map ref={mapRef} />
      {showMapInfoPage && selectedPlace && (
        <PopupContainer>
          <MapInfoPage place={selectedPlace} onClose={handleCloseMapInfoPage} />
        </PopupContainer>
      )}
    </>
  );
}

export default MapContainer;
