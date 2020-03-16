const express = require("express");
const initializer = require("./initializeSession.js");
const sendJson = require("../../helpers/sendJson.js");

const router = new express.Router();

router.get("/init", async (req, res)=>{
  const result = await initializer();
  sendJson(res, result);
});

module.exports = router;
