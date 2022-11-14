import React from "react";
import { useMemo, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";

function MapComponent() {

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      //const { lat, lng } = position.coords;
      // set user position to current position
      setUserPosition({lat: position.coords.latitude, lng: position.coords.longitude})
      console.log('user positon:', userPosition);
    }, () => null);
  }, []);

  // map options
  // make map take up the whole window
  const mapContainerStyle = {
    width: "100vw",
    height: "100vh",
  };
  // create a center point
  const center = {
    lat: 44.9573059,
    lng: -93.25617
  };
  // disable UI and add in the zoom controls
  const options = {
    disableDefaultUI: true,
    zoomControl: true
  }

  
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  // state variables go here
  // store user position in state
  const [userPosition, setUserPosition] = React.useState({});

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
      <p>Map goes here</p>
      <GoogleMap 
      mapContainerStyle={mapContainerStyle} 
      zoom={12} 
      center={userPosition ? userPosition : center}
      options={options}
      onClick={onMapClick}
      onLoad={onMapLoad}
      >
        {/* add a marker at the center of map */}
        <Marker
        position={userPosition ? userPosition : center}
        />

        {markers.map(marker => (
          <Marker key={marker.time} position={{lat: marker.lat, lng: marker.lng}}  
          // set the clicked marker as selected
          onClick={()=>{
            setSelected(marker)
          }}
          />
        ))}
        {selected ? (<InfoWindow position={{lat: selected.lat, lng: selected.lng}} onCloseClick={() => setSelected(null)}>
          <h2>{selected.lat}, {selected.lng}</h2>
          <p></p>
        </InfoWindow>) : null}
      </GoogleMap>
    </>
  );
}

export default MapComponent;