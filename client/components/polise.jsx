import React from "react";

import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../assets/styles/style.scss";
import policeData from "../../data/police.json";

import Buttons from "./button";
import Header from "./header";

const Police = () => {
  let myIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/1022/1022306.png",
    iconSize: [20, 20],
  });

  return (
    <div className="container">
      <div className="font">
        <div>
          <Header />
        </div>
        <div className="btn">
          <Buttons />
        </div>
        <MapContainer center={[42.874622, 74.569763]} zoom={12}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {policeData.map((elem) => (
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

export default Police;
