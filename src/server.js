require("dotenv").config();

const express = require("express");
const app = express();

app.disable("x-powered-by");

const cookieParser = require("cookie-parser");
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(express.json({
  limit: "128kb"
}));

const apis = require("./routes/api/index.js");
app.use("/api", apis);

const {fetchImagesJob, fetchImages} = require("./helpers/fetchImagesJob.js");

app.listen(8080, ()=>{
  fetchImagesJob.start();
  // fetchImages({radius: 1000});
  console.log("Server started");
  console.log("=========================================================");
});
