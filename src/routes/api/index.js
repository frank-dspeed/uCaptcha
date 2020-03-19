import express from 'express';
import path from 'path';

import initializeSession from './initializeSession.js';
import serveImage from './serveImage.js';
import verifyImage from './verifyImage.js';

import sendJson from '../../helpers/sendJson.js';
import {IMAGES_FOLDER, MAX_SESSION_TIME} from '../../R.js';

const router = new express.Router();

router.get('/init', async (req, res)=>{
  try {
    const websiteKey = req.query.k;
    if (!websiteKey) {
      res.end();
      return;
    }

    const session = await initializeSession(websiteKey, req.cookies);
    res.cookie(websiteKey, session.sessionId,
        {httpOnly: true, maxAge: MAX_SESSION_TIME * 1000});
    sendJson(res, session.serialize());
  } catch (e) {
    console.error(e);
    res.end();
  }
});

router.get('/image', async (req, res)=>{
  const sessionId = req.query.s;
  if (!sessionId) {
    res.end();
    return;
  }

  const [suspicious, filename] = await serveImage(sessionId);
  if (suspicious) {
    res.end();
    return;
  }

  res.sendFile(path.join(IMAGES_FOLDER, filename));
});

router.post('/verify', async (req, res)=>{
  const sessionId = req.body.s;
  const mat = req.body.mat;
  console.log(req.body);

  await verifyImage(sessionId, mat);
  sendJson(res, {
    ok: 1,
  });
});

export default router;
