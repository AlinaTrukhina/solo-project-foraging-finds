import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";

function MapComponent() {

  const {} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  })

    return (
      <>
        Map
      </>
    );
}

export default MapComponent;