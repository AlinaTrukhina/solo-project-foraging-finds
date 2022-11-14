import React from "react";
import { useMemo, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { 
  Link,
  HashRouter as Router,
  Route,
  } from 'react-router-dom';
import DetailsPage from "../components/DetailsPage/DetailsPage";

function MapComponent() {

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(position => {
  //     //const { lat, lng } = position.coords;
  //     // set user position to current position
  //     setUserPosition({lat: position.coords.latitude, lng: position.coords.longitude})
  //     console.log('user positon:', userPosition);
  //   }, () => null);
  // }, []);

  // map options
  // make map take up the whole window
  const mapContainerStyle = {
    width: "100vw",
    height: "100vh",
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
    // TODO: add map style
  }

  // load script - load the map, or show error message
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
      }, 
      () => null
    )
  },[]);

  // add mapRef function to store map for use later without re-renders
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    map.current = map;
  }, []);

  // create a function that will pan to user location 
  // pass in latitude and longitude
  const panTo = React.useCallback(({lat, lng}) => {
    mapRef.current.panTo({lat, lng});
  }, [])

  if (loadError) return "Error loading Maps";
  if (!isLoaded) return "loading maps";

  return (
    <>
      <p>Map goes here</p>
      <GoogleMap 
      mapContainerStyle={mapContainerStyle} 
      zoom={12} 
      center={center}
      options={options}
      // on click, set a marker
      // onClick={onMapClick}
      onLoad={onMapLoad}
      onClick={toUserPosition}
      >
        {/* add a marker at the center of map */}
        <Marker
        position={center}
        />

        {markers.map(marker => (
          <Marker key={marker.time} 
          position={{lat: marker.lat, lng: marker.lng}}
          // change the icon to a mushroom
          icon={{
            url: '/svg/mushroom-bolete.svg',
            scaledSize: new window.google.maps.Size(30,30),
            // sets origin to the point where user clicked
            origin: new window.google.maps.Point(0, 0),
            // sets anchor to half the size so that the icon appears on t
            anchor: new window.google.maps.Point(15, 15)
          }}  
          // set the clicked marker as selected
          onClick={()=>{
            setSelected(marker)
          }}
          />
        ))}

        {/* map my markers */}
        {myMarkers.map(marker => (
          <Marker key={marker.title} 
          position={{lat: marker.lat, lng: marker.lng}}
          // change the icon to a mushroom
          icon={{
            url: '/svg/mushroom-bolete.svg',
            scaledSize: new window.google.maps.Size(30,30),
            // sets origin to the point where user clicked
            origin: new window.google.maps.Point(0, 0),
            // sets anchor to half the size so that the icon appears on t
            anchor: new window.google.maps.Point(15, 15)
          }}  
          // set the clicked marker as selected
          onClick={()=>{
            setSelected(marker)
          }}
          />
        ))}
        {/* opens up info window for the selected marker*/}
        {selected ? (<InfoWindow position={{lat: selected.lat, lng: selected.lng}} onCloseClick={() => setSelected(null)}>
          <div>
            <h4>{selected.title}</h4>
            <p>{selected.lat}, {selected.lng}</p>
              
              <Router selected={selected} >
                <Link selected={selected}  to='/details/' >
                  Details
                </Link>
                <Route path="/details/" exact selected={selected}>
                  <DetailsPage selected={selected} />
                </Route>
              </Router>
            
          </div>
        </InfoWindow>) : null}
      </GoogleMap>
    </>
  );
}

export default MapComponent;