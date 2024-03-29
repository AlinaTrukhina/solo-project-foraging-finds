import React from "react";
import { useMemo, useEffect, useCallback } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
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

  // useEffect(() => {
    // navigator.geolocation.getCurrentPosition(position => {
    //   //const { lat, lng } = position.coords;
    //   // set user position to current position
    //   setUserPosition({lat: position.coords.latitude, lng: position.coords.longitude})
    //   console.log('user positon, page load:', userPosition);
    // }, () => null);

  //   dispatch({
  //     type: 'FETCH_PINS'
  //   })
  // }, []);

  // map options
  // make map take up the whole window
  const mapContainerStyle = {
    width: "100vw",
    height: "69.5vh",
    // position: "absolute",
    // bottom: "0px"
  };
  // create a center point
  const center = {
    lat: 44.9862, 
    lng: -93.3246
  };
  // disable UI and add in the zoom controls
  const options = {
    disableDefaultUI: true,
    zoomControl: true,
    styles: mapStylesLight
  }

  // load script - load the map, or show error message
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  // useCallback is hook to avoid re-rendering the map all the time on any action
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

  const toUserPosition = React.useCallback((evt) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {   
        console.log('user position is', 
        {lat: position.coords.latitude.toFixed(4), lng: position.coords.longitude.toFixed(4)});
        setUserPosition({lat: position.coords.latitude, lng: position.coords.longitude});
      }, 
      () => null
    )
  }, []);

  // add mapRef function to store map for use later without re-renders
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
    toUserPosition();
  }, []);


  if (loadError) return "Error loading Map";
  if (!isLoaded) return "Loading map";

  return (
    <>
      <GoogleMap mapContainerClassName="mapContainer"
      mapContainerStyle={mapContainerStyle} 
      zoom={12} 
      // conditional rendering: if userPosition is loaded, center map on user; 
      // otherwise, use center object defined above
      center={userPosition.lat ? userPosition : center}
      options={options}
      // on click, set a marker
      // onClick={onMapClick}
      onLoad={onMapLoad}
      //onClick={toUserPosition}
      >
        {/* add a marker at the center of map */}
        { userPosition && 
        <Marker
        position={
          userPosition.lat ? {lat: userPosition.lat, lng: userPosition.lng} : 
          center}
          icon={{
            url: `${user.avatar}`,
            scaledSize: new window.google.maps.Size(20, 20),
            // sets origin to the point where user clicked
            origin: new window.google.maps.Point(0, 0),
            // sets anchor to half the size so that the icon appears on click position
            anchor: new window.google.maps.Point(10, 10)
          }}  
        />}

{/* Conditional rendering to either put user pins or all pins on map */}
          {/* puts user pins on map */}
          {userPins.map(marker => (
          <Marker key={marker.id} 
          position={{lat: Number(marker.lat), lng: Number(marker.lng)}}
          // change the icon to a mushroom
          icon={{
            url: '/svg/mushrooms-2-mushrooms.svg',
            scaledSize: new window.google.maps.Size(30,30),
            // sets origin to the point where user clicked
            origin: new window.google.maps.Point(0, 0),
            // sets anchor to half the size so that the icon center appears on the origin point
            anchor: new window.google.maps.Point(15, 15)
          }}  
          // set the clicked marker as selected
          onClick={()=>{
            dispatch({
              type: 'SET_SELECTED_PIN',
              payload: marker
            })
          }}
          />
          ))}

          {/* render all pins from store on map */}
          {allPins.map(marker => (
            <Marker key={marker.id} 
            position={{lat: Number(marker.lat), lng: Number(marker.lng)}}
            // change the icon to a mushroom
            icon={{
              url: '/svg/mushrooms-2-mushrooms.svg',
              scaledSize: new window.google.maps.Size(30, 30),
              // sets origin to the point where user clicked
              origin: new window.google.maps.Point(0, 0),
              // sets anchor to half the size so that the icon center appears on the origin point
              anchor: new window.google.maps.Point(15, 15)
            }}  
            // set the clicked marker as selected
            onClick={()=>{
              dispatch({
                type: 'SET_SELECTED_PIN',
                payload: marker
              })
            }}
            />
          ))}

        <Marker key={selectedPin.id} 
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
        />
        {/* opens up info window for the selected marker */}
        {selectedPin.id ? (<InfoWindow position={{
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
        </InfoWindow>) : null}
      </GoogleMap>
      <div id="mapBottom"><p></p></div>
    </>
  );
}

export default MapComponent;