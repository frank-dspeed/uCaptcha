import fs from 'fs';
import path from 'path';
import {client} from '../../helpers/idb.js';
import {PROJECT_ROOT, MAX_SESSION_TIME} from '../../R.js';
import {argmaxThresh} from '../../helpers/utils.js';
import pickRandomFile from './pickRandomFile.js';

/**
 * @typedef {Object} FileMat
 * @property {Array<number>} mat Matrix of floats
 * @property {number} nums Number of users that have seen this challenge
 */

/**
 * Get file matrix
 * @param {string} filename
 * @return {FileMat}
 */
function getMat(image) {
  const mats = JSON.parse(
      fs.readFileSync(
          path.join(PROJECT_ROOT, 'dev', 'mat.json'), {encoding: 'utf8'}));

  return mats[image];
}

/**
 * Update the image mat
 * @param {FileMat} imageMat
 * @param {Array<number>} userMat
 * @param {string} image
 */
function updateMat(imageMat, userMat, image) {
  const updatedMat = Object.assign([], imageMat.mat);
  for (let i = 0; i < imageMat.mat.length; i++) {
    const delta = 0.1;
    if (userMat[i] === 1) {
      updatedMat[i] += delta;
    } else {
      updatedMat[i] -= delta;
    }
  }

  console.log('OLD MAT: ', imageMat.mat);
  console.log('NEW MAT: ', updatedMat);

  imageMat.nums += 1;
  imageMat.mat = updatedMat;

  const mats = JSON.parse(
      fs.readFileSync(
          path.join(PROJECT_ROOT, 'dev', 'mat.json'), {encoding: 'utf8'}));
  mats[image] = imageMat;

  fs.writeFileSync(
      path.join(PROJECT_ROOT, 'dev', 'mat.json'),
      JSON.stringify(mats, null, 2), {encoding: 'utf8'});
}

/**
 * @param {string} sessionId
 * @param {Array<number>} userMat
 * @return {Promise}
 */
export default function(sessionId, userMat) {
  return new Promise((resolve, reject)=>{
    client.get(sessionId, (err, result)=>{
      if (err) return reject(err);

      /** @type {import('../../models/IDBSession.js').IDBSession} */
      result = JSON.parse(result);

      const imageMat = getMat(result.image);
      const trueArgmax = argmaxThresh(imageMat.mat, 0.3).join(',');
      const userArgmax = argmaxThresh(userMat, 1).join(',');

      updateMat(imageMat, userMat, result.image);

      console.log('trueArgmax', trueArgmax);
      console.log('userArgmax', userArgmax);

      if (userArgmax !== trueArgmax) {
        // TODO: Decrease the score based on mat dispersion
        // High variance = small reduction
        // Low variance = high reduction
        result.score -= 0.2;
      } else {
        result.score += 0.2;
      }

      pickRandomFile().then((image)=>{
        const update = JSON.stringify(
            Object.assign(result, {image: image}));

        client.setex(sessionId, MAX_SESSION_TIME,
            update, (err)=>{
              if (err) return reject(err);
              resolve();
            });
      });
    });
  });
}
