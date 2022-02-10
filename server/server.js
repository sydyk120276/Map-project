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
    "Бишкек,+Тоголока Молдо+улица,+дом+3",
  ];

  const url = encodeURI(
    `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=8201c1c3-1913-411b-9300-e3de7614b6f7&geocode=Бишкек,+ибраимова+улица,+дом+181`
  );

  server.get('/api/v1/adress',async (req, res) => {
   const address = await axios(url)
     .then(({ data }) => {
       console.log("data: ", data);
       writeFile(`${__dirname}/data/data.json`, JSON.stringify(data), "utf-8")
       return data;
     })
     .catch((err) => err);
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