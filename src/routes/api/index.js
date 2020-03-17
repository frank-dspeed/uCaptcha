import express from 'express';
import path from 'path';

import initializeSession from './initializeSession.js';
import serveImage from './serveImage.js';
import verifyImage from './verifyImage.js';

import sendJson from '../../helpers/sendJson.js';
import {IMAGES_FOLDER} from '../../R.js';

const router = new express.Router();

router.get('/init', async (req, res)=>{
  const websiteKey = req.query.k;
  if (!websiteKey) {
    res.end();
    return;
  }

  const result = await initializeSession(websiteKey);
  sendJson(res, result);
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

  await verifyImage(sessionId, mat);
});

export default router;
