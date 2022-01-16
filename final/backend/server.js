import express from 'express'
import cors from 'cors'
import Router from './Routers/index.js'
import './mongo.js'
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const app = express()
  // init middleware
  app.use(cors())
  //read from client
  app.use(
    express.urlencoded({
      extended: true
    })
  )
  app.use(express.json())
  // define routes
  app.use('/api',Router)
  // define server
  app.use(express.static(path.join(__dirname, "build")));
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
  const port = process.env.PORT || 5000
  app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})