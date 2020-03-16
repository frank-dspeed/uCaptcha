import express from "express";
import {initializer} from "./initializeSession.js";
import sendJson from "../../helpers/sendJson.js";

const router = express.Router();

router.get("/init", async (req, res)=>{
  const result = await initializer();
  sendJson(res, result);
});

export default router;
