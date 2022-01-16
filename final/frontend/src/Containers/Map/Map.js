import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { useState, useRef, useCallback, useEffect } from "react";
import MapGL, { NavigationControl, ScaleControl, GeolocateControl, LinearInterpolator } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import mapboxgl from "mapbox-gl"; // This is a dependency of react-map-gl even if you didn't explicitly install it
/* eslint import/no-webpack-loader-syntax: off */
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
import { DatePicker } from 'antd';
import moment from "moment";
import axios from "../../axios"
import Pins from '../../Component/Pins'
mapboxgl.workerClass = MapboxWorker;


const Map = ({username}) => {
    const [Date,setDate] = useState(moment());
    const [Data,setData] =useState([]);
    const [viewport, setViewport] = useState({
        latitude: 25.017754858333614,
        longitude: 121.53968590135806,
        zoom: 13
    });
    const mapRef = useRef();
    const handleViewportChange = useCallback(
        (newViewport) => setViewport(newViewport),
        []
    );
    const MAPBOX_TOKEN =
        "pk.eyJ1IjoiZW5naW5la2V2aW4iLCJhIjoiY2t5ZXVqYXU1MGJjMDJvcG1tNmY3enEwcSJ9.6zVa7flOmlUMpCSKOmwvkA";
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
    const GetData = async ()=>{
        const Y = Date.format("YYYY")
        const { data: { NewRecords } } = await axios.get('/api/QueryAddress', { // get backend
            params: {
                username, // give backend
                date_Y:Y,
                status:"支出"
            },
        })
        setData(NewRecords);
    }
    useEffect(()=>{
        GetData()
    },[Date])
    return (
        <div>
            <DatePicker size="large" value={Date} picker="year" onChange={(date) => { setDate(date) }} allowClear={false} />
            <div style={{ height: "90vh" }}>
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
                    {console.log(Data)};
                    {
                    Data.map((info) => (
                        <Pins info={info} />
                    ))
                    }          
                    <Geocoder
                        mapRef={mapRef}
                        onViewportChange={handleGeocoderViewportChange}
                        mapboxApiAccessToken={MAPBOX_TOKEN}
                        position="top-left"
                        style={{ right: '50px', top: '10px' }}
                    />
                    {/* <div className="map-sidebar" style={{left:'90px', bottom:'0px'}}>
                        Longitude: {viewport.longitude} | Latitude: {viewport.latitude} | Zoom: {viewport.zoom}
                    </div> */}
                    <NavigationControl style={{ right: '10px', top: '10px' }} />
                    <ScaleControl maxWidth={100} unit="metric" style={{ right: '10px', bottom: '25px' }} />
                    <GeolocateControl style={{ right: '10px', top: '120px' }} positionOptions={{ enableHighAccuracy: true }} trackUserLocation={false} />
                </MapGL>
            </div>
        </div>
    );
}

export default Map;