import React, { useState, useEffect } from "react";
import axios from "axios";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../assets/styles/style.scss"
import placesData from '../../data/data.json'


const Maps = () => {
  const [state, setState] = useState("");
  console.log("state: ", state);
   const array = placesData.pos.split(" ").map((el) => Number(el));
  console.log('placesData: ', array)
  console.log("array: ", array);
  const obj = {
    latitude: array[0],
    longitude: array[1],
  };
  console.log("obj: ", obj);

  let adress = [
    "Бишкек,+ибраимова+улица,+дом+181",
    "Бишкек,+Крылова+улица,+дом+5",
    "Бишкек,+Ю.Фучика+улица,+дом+15",
    "Бишкек,+Тоголока Молдо+улица,+дом+3",
  ];

  useEffect(() => {
    adress.map((el) => {
      return axios(
        `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=8201c1c3-1913-411b-9300-e3de7614b6f7&geocode=${el}`
      )
        .then(({ data }) => {
          
          return setState(
            data.response.GeoObjectCollection.featureMember[1].GeoObject.Point
              .pos
          );
        })
        .catch((err) => err);
    });
  }, []);

  let myIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/4108/4108824.png",
    iconSize: [50, 50],
  });

  return (
    <div className="container">
      <MapContainer center={[42.874622, 74.569763]} zoom={13}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

       {array.map((el, index) => {
        <Marker
        key={index}
        position={[el[0], el[1]]}
        icon={myIcon}
      >
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
       })}

      </MapContainer>
    </div>
  );
};

export default Maps;
