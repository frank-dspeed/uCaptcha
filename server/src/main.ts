require("dotenv").config();

import express from "express";
const app = express();

import cookieParser from "cookie-parser";
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(express.json({
  limit: "128kb"
}));

import apis from "./routes/api";
app.use("/api", apis);

import {fetchImagesJob, fetchImages} from "./helpers/fetchImagesJob";
import pickRandomFile from "./routes/api/pickRandomFile";

app.listen(8080, ()=>{
  fetchImagesJob.start();
  // fetchImages({radius: 1000});
  console.log("Server started")
  console.log("=========================================================")
})
