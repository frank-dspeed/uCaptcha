import express from "express";
import initializer from "./initializeSession"
import {randomBytes} from "../../helpers/utils";
import InitSession from "../../../../shared/fun/initializeSession";

const router = express.Router()

router.get("/init", async (req, res)=>{
  const randomSessionId = randomBytes(8);
  const result = await initializer();
  
  const initSession = new InitSession();
  initSession.sessionId = randomSessionId;
  initSession.imageUrl = result;
  const payload = initSession.serialize();
  
  res.setHeader("Content-Type", "application/json");
  res.send(":)"+JSON.stringify(payload))
});

export default router;
