import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();

app.disable('x-powered-by');

import cookieParser from 'cookie-parser';
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(express.json({
  limit: '128kb',
}));

if (process.env.NODE_ENV === 'development') {
  app.use((req, _res, next)=>{
    console.log(`${req.method} ${req.url}`);
    next();
  });
}

import apis from './routes/api/index.js';
app.use('/api', apis);

// import {fetchImagesJob} from './helpers/fetchImagesJob.js';
// import {fetchImages} from './helpers/fetchImagesJob.js';
export {app};
