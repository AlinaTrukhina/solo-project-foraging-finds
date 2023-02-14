import React from "react";
import { useMemo, useEffect, useCallback } from "react";
// import { GoogleMap, useLoadScript, InfoWindow } from "@react-google-maps/api";
import { 
  Link,
  HashRouter as Router,
  Route,
  useHistory,
  useParams
  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import mapStyles from "./mapStyles";
import mapStylesLight from "./mapStylesLight";

import { MapContainer, TileLayer, useMap, Popup, Marker } from 'react-leaflet';

function MapComponent() {

  const dispatch = useDispatch();
  const history = useHistory();

  // selectors
  const user = useSelector((store) => store.user);
  const allPins = useSelector(store => store.pins);
  const selectedPin = useSelector(store => store.selectedPin);
  const userPins = useSelector(store => store.userPins);

  // state variables go here
  // store user position in state
  const [userPosition, setUserPosition] = React.useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      //const { lat, lng } = position.coords;
      // set user position to current position
      setUserPosition({lat: position.coords.latitude, lng: position.coords.longitude})
      console.log('user positon, page load:', userPosition);
    }, () => null);

    dispatch({
      type: 'FETCH_PINS'
    })
  }, []);

  // map options
  // make map take up the whole window
  // const mapContainerStyle = {
  //   width: "100vw",
  //   height: "69.5vh",
    // position: "absolute",
    // bottom: "0px"
  // };
  // create a center point
  const center = {
    latitude: 44.9862, 
    longitude: -93.3246
  };
  // disable UI and add in the zoom controls
  // const options = {
  //   disableDefaultUI: true,
  //   zoomControl: true,
  //   styles: mapStylesLight
  // }

  // load script - load the map, or show error message
  // const { isLoaded, loadError } = useLoadScript({
  //   googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  // });

  // useCallback ishook to avoid re-rendering the map all the time on any action
  // onMapClick will add a marker at position of click to markers array
  // const onMapClick = React.useCallback((evt) => { 
  //   setMarkers((current) => [
  //     ...current, 
  //     {
  //     lat: evt.latLng.lat(),
  //     lng: evt.latLng.lng(),
  //     time: new Date(),
  //     },
  //   ]);
  // }, []);

  // const toUserPosition = React.useCallback((evt) => {
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {   
  //       console.log('user position is', 
  //       {lat: position.coords.latitude.toFixed(4), lng: position.coords.longitude.toFixed(4)});
  //       setUserPosition({lat: position.coords.latitude, lng: position.coords.longitude});
  //     }, 
  //     () => null
  //   )
  // }, []);

  // add mapRef function to store map for use later without re-renders
  // const mapRef = React.useRef();
  // const onMapLoad = React.useCallback((map) => {
  //   mapRef.current = map;
  //   toUserPosition();
  // }, []);


  // if (loadError) return "Error loading Map";
  // if (!isLoaded) return "Loading map";

  return (
    <>

    <MapContainer center={[44.9572619, -93.2561026]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[45, -93]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <Marker position={[Number(center.latitude), Number(center.longitude)]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      if (!userPins[0]) {
      allPins.map(marker => (
            <Marker key={marker.id} 
            position={[Number(marker.lat), Number(marker.lng)]}
            // change the icon to a mushroom
            // set the clicked marker as selected
            onClick={()=>{
              dispatch({
                type: 'SET_SELECTED_PIN',
                payload: marker
              })
            }}>
              <Popup>
                {marker.title} <br />
                <Router>
                <Link  to={`/details/${marker.id}`}> 
                  Details
                </Link>
                </Router>
                <br />
                {Number(marker.lat).toFixed(4)}, {Number(marker.lng).toFixed(4)}
              </Popup>
            </Marker>
          )) }
          // {/* Conditional rendering to either put user pins or all pins on map */}
          // {/* puts user pins on map */}
          {userPins.map(marker => (
          <Marker key={marker.id} 
          position={[Number(marker.lat), Number(marker.lng)]}
          // change the icon to a mushroom
          // set the clicked marker as selected
          onClick={()=>{
            dispatch({
              type: 'SET_SELECTED_PIN',
              payload: marker
            })
          }}>
            <Popup>
              {marker.title} <br />
              <Router>
              <Link  to={`/details/${marker.id}`}> 
                Details
              </Link>
              </Router>
              <br />
              {Number(marker.lat).toFixed(4)}, {Number(marker.lng).toFixed(4)}
            </Popup>
          </Marker>))}
    </MapContainer>
{/*  
        {/* add a marker at the center of map */}

        {/* <Marker key={selectedPin.id} 
          position={{lat: Number(selectedPin.lat), lng: Number(selectedPin.lng)}}
          // change the icon to a mushroom
          icon={{
            url: '/svg/mushrooms-2-mushrooms.svg',
            scaledSize: new window.google.maps.Size(30, 30),
            // sets origin to the point where user clicked
            origin: new window.google.maps.Point(0, 0),
            // sets anchor to half the size so that the icon center appears on the origin point
            anchor: new window.google.maps.Point(15, 15)
          }}
        /> */}
        {/* opens up info window for the selected marker */}
        {/* {selectedPin.id ? (<InfoWindow position={{
          lat: Number(selectedPin.lat), lng: Number(selectedPin.lng)}} 
          onCloseClick={() => dispatch({
          type: 'RESET_SELECTED_PIN'
          })}>
          <div>
            <h4>{selectedPin.title}</h4>
            <p>location coordinates:</p>
            <p>{selectedPin.lat}, {selectedPin.lng}</p>
              
              <Router>
                <Link  to={`/details/${selectedPin.id}`}> 
                  Details
                </Link>
              </Router>
            
          </div>
        </InfoWindow>) : null} */}
      {/* </GoogleMap> */}
      <div id="mapBottom"><p></p></div>
    </>
  );
}

export default MapComponent;