import React from "react";
import { useMemo, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { 
  Link,
  HashRouter as Router,
  Route,
  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DetailsPage from "../DetailsPage/DetailsPage";
import mapStyles from "./mapStyles"

function MapComponent() {

  const dispatch = useDispatch();
  const allPins = useSelector(store => store.pins);

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
  const mapContainerStyle = {
    width: "100vw",
    height: "75vh",
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
    styles: mapStyles,
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
        console.log(position);
        setUserPosition({lat: position.coords.latitude, lng: position.coords.longitude});
      }, 
      () => null
    )
  }, []);

  // add mapRef function to store map for use later without re-renders
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    map.current = map;
    toUserPosition();
  }, []);

  // create a function that will pan to user location 
  // pass in latitude and longitude
  const panTo = React.useCallback(({lat, lng}) => {
    mapRef.current.panTo({lat, lng});
  }, [])

  if (loadError) return "Error loading Map";
  if (!isLoaded) return "Loading map";

  return (
    <>
      <h2>User Position: {userPosition.lat}, {userPosition.lng}</h2>
      {/* navigation for search, add pin, my pins */}
      <nav>
        <button>Search</button>
        <button>Add Pin</button>
        <button>My Pins</button>
      </nav>
      {/* <CenterMap panTo={panTo} userPosition={userPosition }  /> */}
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
            setSelected(marker);
          }}
          />
        ))}

        {/* map my markers */}
        {myMarkers.map(marker => (
          <Marker key={marker.title} 
          position={{lat: marker.lat, lng: marker.lng}}
          // change the icon to a mushroom
          icon={{
            url: '/svg/mushroom-colorful-amanita.svg',
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
        {selected ? (<InfoWindow position={{lat: Number(selected.lat), lng: Number(selected.lng)}} onCloseClick={() => setSelected(null)}>
          <div>
            <h4>{selected.title}</h4>
            <p>{selected.lat}, {selected.lng}</p>
              
              <Router selected={selected} >
                <Link selected={selected}  to="/details/:id" >
                  Details
                </Link>
              </Router>
            
          </div>
        </InfoWindow>) : null}
      </GoogleMap>
    </>
  );
}

// does not work yet
// function CenterMap({ panTo, toUserPosition }) {
//   return (
//   <button onClick={() => {
//     toUserPosition();
//     panTo({lng: userPosition.lat, lng: userPosition.lng})
//   }}>
//   Center Map</button>
//   );
// }

export default MapComponent;