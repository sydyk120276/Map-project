import express from "express"
import { resolve } from "path"
import cors from 'cors'
import cookieParser from "cookie-parser"
import axios from "axios"
import { writeFile } from "fs/promises"

import { Html } from "../client/html.js"



const server = express()

const PORT = process.env.PORT || 8080
const __dirname = process.cwd()

const middleware = [
  cors(),
  cookieParser(),
  express.json({ limit: "40kb" }),
  express.static(resolve(__dirname, "dist"))
]

middleware.forEach((it) => server.use(it))

server.get('/', (req, res) => {
  res.send('Express Server')
})

  let adress = [
    "Бишкек,+ибраимова+улица,+дом+181",
    "Бишкек,+Крылова+улица,+дом+5",
    "Бишкек,+Ю.Фучика+улица,+дом+15",
    "Бишкек,+Тоголока Молдо+улица,+дом+3"
  ]

  const url = encodeURI(
    `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=8201c1c3-1913-411b-9300-e3de7614b6f7&geocode=Бишкек,+Крылова+улица,+дом+5`
  );

  server.get('/api/v1/adress',async (req, res) => {
let obj = [];
    const address = await Promise.all(adress.map(async (elem) => {
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
        .catch((err) => err)

    }));
      console.log("obj:______", obj);
      writeFile(`${__dirname}/data/data.json`, JSON.stringify(obj), "utf-8");

            console.log("address:____", address)
     res.json(address)
  })


server.get("/*", (req, res) => {
  const initialState = {
    location: req.url
  }
  res.send(
    Html({
      body: '',
      initialState
    })
  )
})

server.listen(PORT, () => {
  console.log(`Serving at http://localhost${PORT}`)
})