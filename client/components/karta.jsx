import React from 'react'
import L from "leaflet";
import { Map, MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../assets/styles/style.scss";

const Karta = () => {
  return (
    <div className="container">
      <MapContainer center={[51.505, -0.09]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Karta
