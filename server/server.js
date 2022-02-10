import express from "express"
import { resolve } from "path"
import cors from 'cors'
import cookieParser from "cookie-parser"

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