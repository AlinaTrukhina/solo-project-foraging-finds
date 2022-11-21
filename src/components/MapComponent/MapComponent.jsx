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

function MapComponent() {

  const dispatch = useDispatch();
  const history = useHistory();

  // selectors
  const allPins = useSelector(store => store.pins);
  const selectedPin = useSelector(store => store.selectedPin);
  const userPins = useSelector(store => store.userPins);

  useEffect(() => {
    // navigator.geolocation.getCurrentPosition(position => {
    //   //const { lat, lng } = position.coords;
    //   // set user position to current position
    //   setUserPosition({lat: position.coords.latitude, lng: position.coords.longitude})
    //   console.log('user positon, page load:', userPosition);
    // }, () => null);

    dispatch({
      type: 'FETCH_PINS'
    })
  }, []);

  // map options
  // make map take up the whole window
  const mapContainerStyle = {
    width: "100vw",
    height: "70vh",
  };
  // create a center point
  const center = {
    lat: 44.986255478183345, 
    lng: -93.32462156101973
  };
  // disable UI and add in the zoom controls
  const options = {
    disableDefaultUI: true,
    zoomControl: true,
    styles: mapStyles
  }

  // load script - load the map, or show error message
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  // state variables go here
  // store user position in state
  const [userPosition, setUserPosition] = React.useState({});

  // add some map markers to render
  const myMarkers = [
    {
      id: 1,
      lat: 44.985, 
      lng: -93.31,
      title: 'King Bolete'
    },
    {     
      id: 2,
      lat: 44.985, 
      lng: -93.33,
      title: 'Amanita Muscaria'
    },
    {     
      id: 3,
      lat: 44.94852, 
      lng: -93.260536,
      title: 'Honey Mushroom'
    }
  ]

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

  const toUserPosition = React.useCallback((evt) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {   
        console.log('user position is', {lat: position.coords.latitude, lng: position.coords.longitude})
        console.log(position);
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

  // create a function that will pan to user location 
  // pass in latitude and longitude
  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
  }, []);
  
  function Locate({ panTo }) {
    return (
      <button className="locate"
      onClick={()=>{panTo({
        lat: userPosition.lat,
        lng: userPosition.lng,
      })}}
      >
        Center Map
      </button>
    )
  }

  if (loadError) return "Error loading Map";
  if (!isLoaded) return "Loading map";

  return (
    <>
      {/* <h5>User Position: {userPosition.lat}, {userPosition.lng}</h5> */}
      {/* <Locate panTo={panTo} /> */}
      <button>{allPins[0].id ? "Show All Pins" : "Hide All Pins"}</button>
      
      <GoogleMap 
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
        <Locate />
        {/* add a marker at the center of map */}
        { userPosition && 
        <Marker
        position={
          userPosition.lat ? {lat: userPosition.lat, lng: userPosition.lng} : 
          center}
          icon={{
            url: '/svg/yep-icon.svg',
            scaledSize: new window.google.maps.Size(30,30),
            // sets origin to the point where user clicked
            origin: new window.google.maps.Point(0, 0),
            // sets anchor to half the size so that the icon appears on t
            anchor: new window.google.maps.Point(15, 15)
          }}  
        />}

{/* Conditional rendering to either put user pins or all pins on map */}
          {/* puts user pins on map */}
          {userPins.map(marker => (
          <Marker key={marker.id} 
          position={{lat: Number(marker.lat), lng: Number(marker.lng)}}
          // change the icon to a mushroom
          icon={{
            url: '/svg/musroom-colored-mypin.svg',
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
        

        {/* opens up info window for the selected marker */}
        {selectedPin.id ? (<InfoWindow position={{
          lat: Number(selectedPin.lat), lng: Number(selectedPin.lng)}} 
          onCloseClick={() => dispatch({
          type: 'SET_SELECTED_PIN', 
          payload: {}
          })}>
          <div>
            <h4>{selectedPin.title}</h4>
            <p>{selectedPin.lat}, {selectedPin.lng}</p>
              
              <Router>
                <Link  to={`/details/${selectedPin.id}`}> 
                  Details
                </Link>
              </Router>
            
          </div>
        </InfoWindow>) : null}
      </GoogleMap>
    </>
  );
}


export default MapComponent;