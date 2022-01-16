import React from "react";
import Geocode from "react-geocode";


const Getcoordinate = (address)=>{
    Geocode.setApiKey("AIzaSyD7vSdUKsQRZcZ6tfi7EPFXuiDWSWtLZ7A");
    Geocode.setLanguage("zh-TW");
    Geocode.setLocationType("ROOFTOP");
    Geocode.enableDebug();
    Geocode.fromAddress(address).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          let coordinate = [];
          coordinate.push(lat);
          coordinate.push(lng);
          console.log(coordinate)
          return coordinate
        },
        (error) => {
          console.error(error);
        }
    );
}
export default Getcoordinate;
