import React from "react";

import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../assets/styles/style.scss"
import placesData from '../../data/data.json'


const Maps = () => {

  let myIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/4478/4478094.png",
    iconSize: [30, 30],
  });

  return (
    <div className="container">
      <MapContainer center={[42.874622, 74.569763]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
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
  );
};

export default Maps;
