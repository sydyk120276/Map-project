import React from "react";

import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../assets/styles/style.scss"
import placesData from '../../data/data.json'

import Buttons from "./button";
import Header from "./header";


const Maps = () => {

  let myIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/3448/3448422.png",
    iconSize: [25, 25],
  });

  return (
    <div className="container ">
      <div className="font">
        <div>
          <Header />
        </div>
        <div className="btn">
          <Buttons />
        </div>

        <MapContainer center={[42.874622, 74.569763]} zoom={12}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {placesData.map((elem) => (
            <Marker
              key={elem.shirota}
              position={[Number(elem.shirota), Number(elem.dolgota)]}
              icon={myIcon}
            >
              <Popup>{elem.AddressLine}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Maps;
