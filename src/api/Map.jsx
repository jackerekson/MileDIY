import React, { useState, useEffect, useRef } from 'react'
import { Map, GoogleApiWrapper } from 'google-maps-react'

const MapContainer = ({google, lat, long, destination, mapShow, setMapShow}) => {
  const mapContainerRef = useRef();

  const [map, setMap] = useState();

  useEffect(() => {
    if(!map || !destination?.length){
      return;
    }
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const directionsService = new google.maps.DirectionsService();
  
    directionsRenderer.setMap(map);
    directionsService
    .route({
      origin: {  lat: lat, lng: long},
      destination: {  lat: destination[1] , lng: destination[0]},
      travelMode: google.maps.TravelMode["DRIVING"],
    })
    .then((response) => {
      directionsRenderer.setDirections(response);
    })
    .catch( console.error )
  }, [map, lat, long, destination]);

  const onMapReady = (mapProps, mapInstance) => {
    setMap(mapInstance)
  }
  
  if(!mapShow){
    return(
      null
    )
  }

  return(
      <div>
        <button onClick={e=>setMapShow(false)}>Clear Map</button>
        <Map 
          ref={mapContainerRef}
          onReady={onMapReady}
          google={google}
          zoom={14}
          center={{ lat, lng: long }}>
        </Map>
      </div>
  )
}


export default GoogleApiWrapper({
  
})(MapContainer)
