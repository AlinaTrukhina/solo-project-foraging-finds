import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import MapComponent from '../../MapComponent/MapComponent';


function LoginPage() {
  
  const history = useHistory();


  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;
    // Show a map centered at latitude / longitude.
    console.log(position.coords);
  });

  // Geolocation API using browser's geolocation method navigator.geolocation
    const successCallback = (position) => {
      console.log(position);
    };
    
    const errorCallback = (error) => {
      console.log(error);
    };

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
    };

    navigator.geolocation.getCurrentPosition (
      successCallback,
      errorCallback,
      // options
    );

    // using GoogleMapsAPI to create a map interface


  return (
    <>
    <div>
      <LoginForm />

      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </button>
      </center>
    </div>
    {/* <Wrapper apiKey={process.env.GOOGLE_API_KEY}>
      <MyMapComponent />
    </Wrapper> */}
    <MapComponent />
    </>
  );
}

export default LoginPage;
