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

import apis from './routes/api/index.js';
app.use('/api', apis);

import {fetchImagesJob, fetchImages} from './helpers/fetchImagesJob.js';

app.listen(8080, ()=>{
  fetchImagesJob.start();
  // fetchImages({radius: 1000});
  console.log('Server started');
  console.log('=========================================================');
});
