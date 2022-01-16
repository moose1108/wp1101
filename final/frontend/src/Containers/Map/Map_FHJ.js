import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { useState, useRef, useCallback, useEffect } from "react";
import MapGL, {NavigationControl, ScaleControl, GeolocateControl,LinearInterpolator} from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import HashLoader from 'react-spinners/HashLoader';
import {Marker} from 'react-map-gl'; 
import Pins from './Pins'
import locateimg from '../img/locate.jpg'
import mapboxgl from "mapbox-gl"; // This is a dependency of react-map-gl even if you didn't explicitly install it
/* eslint import/no-webpack-loader-syntax: off */
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;






const Map = (props) => {
  const {map_data} = props;
  const [viewport, setViewport] = useState({
    latitude: 23.70449645003316,
    longitude: 120.43654198160961,
    zoom: 13
  });
  const mapRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );
  const MAPBOX_TOKEN =
  "pk.eyJ1IjoiZmhqMDYwNCIsImEiOiJja3dqMW5qbWIxZHJmMm9tanp1Yjd6ZWllIn0.EPqTtBWOdRwQLTnRByTMFA";

  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 2000 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides
      });
    },
    [handleViewportChange]
  );
  if ("geolocation" in navigator) { 
    navigator.geolocation.getCurrentPosition(position => { 
        console.log(position.coords.latitude, position.coords.longitude); 
    });
  } 
  return (
    <div>
        <div style={{ height: "75vh" }}>
        <MapGL
                  ref={mapRef}
                  {...viewport}
                  mapStyle="mapbox://styles/mapbox/streets-v11"
                  width="100%"
                  height="100%"
                  onViewportChange={handleViewportChange}
                  mapboxApiAccessToken={MAPBOX_TOKEN}
                  transitionInterpolator={new LinearInterpolator()}
              > 
              {
                map_data.games.map((info) => (
                  <Pins info={info} />
                ))

              }
              {/* <Pins Data={Data} ></Pins>               */}
              <Geocoder
                    mapRef={mapRef}
                    onViewportChange={handleGeocoderViewportChange}
                    mapboxApiAccessToken={MAPBOX_TOKEN}
                    position="top-left"
                    style={{right:'50px',top:'10px'}}
              />
              {/* <div className="map-sidebar" style={{left:'90px', bottom:'0px'}}>
                        Longitude: {viewport.longitude} | Latitude: {viewport.latitude} | Zoom: {viewport.zoom}
                    </div> */}
              <NavigationControl style={{right:'10px',top:'10px'}}/>
              <ScaleControl maxWidth={100} unit="metric" style={{right:'10px', bottom:'25px'}}/>
              <GeolocateControl style={{right:'10px', top:'120px'}} positionOptions={{enableHighAccuracy: true}} trackUserLocation={false}/>
        </MapGL>
        </div>
    </div>
  );
}

export default Map;