import React, { useState, useEffect } from "react";
import axios from "axios";
import L from "leaflet";
import { MapContainer, TitleLayer, Marker, Popup } from "react-leaflet";

function Cordinat() {
  const [state, setState] = useState("");
  console.log("state: ", state);
  const array = state.split(" ");
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

  return (
    <div className="container">
      <h1 className="">Персонажи Marvel</h1>
      <div className="container2">
        {state}
        {/* {array.map((heroes) => {
          return <h1 key={heroes}>{heroes}</h1>;
        })} */}
      </div>
    </div>
  );
}

export default Cordinat;
