import React from "react";
import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";

function MapComponent() {

  const mapContainerStyle = {
    width: "100vw",
    height: "100vh",
  };

  const center = {
    lat: 44.9573059,
    lng: -93.25617
  };

  const options = {
    disableDefaultUI: true,
    zoomControl: true
  }

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  // state variables go here
  // store markers array in state - will be used when user clicks a point on the map
  const [markers, setMarkers] = React.useState([]);
  
  // store selected marker state
  const [selected, setSelected] = React.useState(null);


  // useCallback ishook to avoid re-rendering the map all the time on any action
  // onMapClick will add a marker at position of click to markers array
  const onMapClick = React.useCallback((evt) => { 
    setMarkers((current) => [
      ...current, 
      {
      lat: evt.latLng.lat(),
      lng: evt.latLng.lng(),
      time: new Date(),
      },
    ]);
  //console.log('markers are', markers);
  }, []);

  // add mapRef function to store map for use later without re-renders
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    map.current = map;
  }, []);

  if (loadError) return "Error loading Maps";
  if (!isLoaded) return "loading maps";

  return (
    <>
      Map
      <GoogleMap 
      mapContainerStyle={mapContainerStyle} 
      zoom={12} 
      center={center}
      options={options}
      onClick={onMapClick}
      onLoad={onMapLoad}
      >
        {/* add a marker at the center of map */}
        <Marker
        position={{
          lat: center.lat,
          lng: center.lng
        }} />

        {markers.map(marker => (
          <Marker key={marker.time} position={{lat: marker.lat, lng: marker.lng}}  />
        ))}
        
      </GoogleMap>
    </>
  );
}

export default MapComponent;