import express from "express";
import { resolve } from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import axios from "axios";
import { writeFile } from "fs/promises";

import { Html } from "../client/html.js";

const server = express();

const PORT = process.env.PORT || 8080;
const __dirname = process.cwd();

const middleware = [
  cors(),
  cookieParser(),
  express.json({ limit: "40kb" }),
  express.static(resolve(__dirname, "dist")),
];

middleware.forEach((it) => server.use(it));

server.get("/", (req, res) => {
  res.send("Express Server");
});

let adress = [
  "Бишкек,+ибраимова+улица,+дом+181",
  "Бишкек,+Крылова+улица,+дом+5",
  "Бишкек,+Ю.Фучика+улица,+дом+15",
  "Бишкек,+Тоголока Молдо+улица,+дом+3/1",
  "Бишкек,+​микрорайон Восток-5,+дом+40",
  "Бишкек,+Жукеева-Пудовкина,+дом+75",
  "Бишкек,+Кольбаева,+дом+42",
  "Бишкек,+6-й микрорайон,+дом+1",
  "Бишкек,+Манаса,+дом+41",
  "Бишкек,+Якова Логвиненко,+дом+30/1",
  "Бишкек,+3-я линия,+дом+25/1",
  "Бишкек,+Жоомарта Боконбаева,+дом+61",
  "Бишкек,+Киевская,+дом+154",
];


server.get("/api/v1/adress", async (req, res) => {
  let obj = [];
  await Promise.all(
    adress.map(async (elem) => {
      return await axios(
        encodeURI(
          `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=8201c1c3-1913-411b-9300-e3de7614b6f7&geocode=${elem}`
        )
      )
        .then(({ data }) => {
          console.log("data.response:____", data.response);
          return data.response.GeoObjectCollection.featureMember[0].GeoObject;
        })
        .then((cordinat) => {
          if (adress.length > 0) {
            return obj.push({
              AddressLine: cordinat.name,
              shirota: cordinat.Point.pos.split(" ")[1],
              dolgota: cordinat.Point.pos.split(" ")[0],
            });
          }
          return obj;
        })
        .catch((err) => err);
    })
  );
  console.log("obj:______", obj);
  writeFile(`${__dirname}/data/data.json`, JSON.stringify(obj), "utf-8");

  console.log("address:____", obj);
  res.json(obj);
});

let adressShcool = [
  "Бишкек,+Нурмамбетова+улица,+дом+15",
  "Бишкек,+Токтоналиева+улица,+дом+6/Б",
  "Бишкек,+Ю.Фучика+улица,+дом+15",
  "Бишкек,+Касыма Тыныстанова+улица,+дом+110",
  "Бишкек,+​Суеркулова,+дом+8",
  "Бишкек,+Гагарина,+дом+2",
  "Бишкек,+микрорайон Восток-5,+дом+1а",
  "Бишкек,+Чуй,+дом+56",
  "Бишкек,+Чынгыза Айтматова,+дом+1/1",
  "Бишкек,+микрорайон Джал-23,+дом+71/1",
  "Бишкек,+3-я линия,+дом+25/1",
  "Бишкек,+​Тоголок Молдо,+дом+73",
  "Бишкек,+Кривоносова,+дом+11",
];


server.get("/api/v1/shcool", async (req, res) => {
  let obj = [];
  await Promise.all(
    adressShcool.map(async (elem) => {
      return await axios(
        encodeURI(
          `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=8201c1c3-1913-411b-9300-e3de7614b6f7&geocode=${elem}`
        )
      )
        .then(({ data }) => {
          console.log("data.response:____", data.response);
          return data.response.GeoObjectCollection.featureMember[0].GeoObject;
        })
        .then((cordinat) => {
          if (adress.length > 0) {
            return obj.push({
              AddressLine: cordinat.name,
              shirota: cordinat.Point.pos.split(" ")[1],
              dolgota: cordinat.Point.pos.split(" ")[0],
            });
          }
          return obj;
        })
        .catch((err) => err);
    })
  );
  console.log("obj:______", obj);
  writeFile(`${__dirname}/data/shcool.json`, JSON.stringify(obj), "utf-8");

  console.log("address:____", obj);
  res.json(obj);
});

let adressHotels = [
  "Бишкек,+Касымалы Баялинова,+дом+134",
  "Бишкек,+Медерова+улица,+дом+71",
  "Бишкек,+Юсупа Абдрахманова,+дом+190",
  "Бишкек,+Ибраимова,+дом+63",
  "Бишкек,+Малдыбаева,+дом+69",
  "Бишкек,+Токтоналиева,+дом+8Б",
  "Бишкек,+Пушкина,+дом+203",
  "Бишкек,+Чуй,+дом+158",
  "Бишкек,+Фрунзе,+дом+122",
  "Бишкек,+Киевская ,+дом+210",
  "Бишкек,+Орозбекова,+дом+87",
  "Бишкек,+​Жумабек,+дом+107",
  "Бишкек,+Лесхозная,+дом+10",
];


server.get("/api/v1/hotel", async (req, res) => {
  let obj = [];
  await Promise.all(
    adressHotels.map(async (elem) => {
      return await axios(
        encodeURI(
          `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=8201c1c3-1913-411b-9300-e3de7614b6f7&geocode=${elem}`
        )
      )
        .then(({ data }) => {
          console.log("data.response:____", data.response);
          return data.response.GeoObjectCollection.featureMember[0].GeoObject;
        })
        .then((cordinat) => {
          if (adress.length > 0) {
            return obj.push({
              AddressLine: cordinat.name,
              shirota: cordinat.Point.pos.split(" ")[1],
              dolgota: cordinat.Point.pos.split(" ")[0],
            });
          }
          return obj;
        })
        .catch((err) => err);
    })
  );
  console.log("obj:______", obj);
  writeFile(`${__dirname}/data/hotel.json`, JSON.stringify(obj), "utf-8");

  console.log("address:____", obj);
  res.json(obj);
});

let adressPolice = [
  "Бишкек,+Чокморова,+дом+137",
  "Бишкек,+Ахунбаева+улица,+дом+137",
  "Бишкек,+Кулатова,+дом+24/4",
  "Бишкек,+​Байтик Баатыра,+дом+1/4",
  "Бишкек,+Жибек-Жолу,+дом+417",
  "Бишкек,+Орозбекова,+дом+293/1",
  "Бишкек,+Садыгалиева,+дом+7/9",
  "Бишкек,+​6-й микрорайон,+дом+38/2а",
  "Бишкек,+Куйручук,+дом+125а",
  "Бишкек,+микрорайон Джал-23 ,+дом+26Б",
  "Бишкек,+микрорайон Восток-5,+дом+10а/1",
  "Бишкек,+Кулатова,+дом+81Б",
  "Бишкек,+Тыныбекова,+дом+6Б",
];


server.get("/api/v1/police", async (req, res) => {
  let obj = [];
  await Promise.all(
    adressPolice.map(async (elem) => {
      return await axios(
        encodeURI(
          `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=8201c1c3-1913-411b-9300-e3de7614b6f7&geocode=${elem}`
        )
      )
        .then(({ data }) => {
          console.log("data.response:____", data.response);
          return data.response.GeoObjectCollection.featureMember[0].GeoObject;
        })
        .then((cordinat) => {
          if (adress.length > 0) {
            return obj.push({
              AddressLine: cordinat.name,
              shirota: cordinat.Point.pos.split(" ")[1],
              dolgota: cordinat.Point.pos.split(" ")[0],
            });
          }
          return obj;
        })
        .catch((err) => err);
    })
  );
  console.log("obj:______", obj);
  writeFile(`${__dirname}/data/police.json`, JSON.stringify(obj), "utf-8");

  console.log("address:____", obj);
  res.json(obj);
});


let adressShaurma = [
  "Бишкек,+Чуй+улица,+дом+100",
  "Бишкек,+7-й микрорайон+улица,+дом+52/2",
  "Бишкек,+​Ахматбека Суюмбаева,+дом+123/4",
  "Бишкек,+​Ахматбека Суюмбаева,+дом+194/1",
  "Бишкек,+​Киевская ,+дом+148",
  "Бишкек,+Жукеева-Пудовкина,+дом+87/2",
  "Бишкек,+Жоомарта Боконбаева,+дом+95",
  "Бишкек,+Панфилова,+дом+54/1",
  "Бишкек,+Ахматбека Суюмбаева,+дом+142",
  "Бишкек,+Московская,+дом+76",
  "Бишкек,+Суванбердиева,+дом+31/1",
  "Бишкек,+Чуй,+дом+158",
  "Бишкек,+Торокула Айтматова,+дом+56/10",
];


server.get("/api/v1/shaurma", async (req, res) => {
  let obj = [];
  await Promise.all(
    adressShaurma.map(async (elem) => {
      return await axios(
        encodeURI(
          `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=8201c1c3-1913-411b-9300-e3de7614b6f7&geocode=${elem}`
        )
      )
        .then(({ data }) => {
          console.log("data.response:____", data.response);
          return data.response.GeoObjectCollection.featureMember[0].GeoObject;
        })
        .then((cordinat) => {
          if (adress.length > 0) {
            return obj.push({
              AddressLine: cordinat.name,
              shirota: cordinat.Point.pos.split(" ")[1],
              dolgota: cordinat.Point.pos.split(" ")[0],
            });
          }
          return obj;
        })
        .catch((err) => err);
    })
  );
  console.log("obj:______", obj);
  writeFile(`${__dirname}/data/shaurma.json`, JSON.stringify(obj), "utf-8")

  console.log("address:____", obj)
  res.json(obj);
});

server.get("/*", (req, res) => {
  const initialState = {
    location: req.url,
  };
  res.send(
    Html({
      body: "",
      initialState,
    })
  );
});

server.listen(PORT, () => {
  console.log(`Serving at http://localhost${PORT}`);
});
