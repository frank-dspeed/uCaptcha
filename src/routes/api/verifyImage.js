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
function getMat(filename) {
  const mats = JSON.parse(
      fs.readFileSync(
          path.join(PROJECT_ROOT, 'dev', 'mat.json'), {encoding: 'utf8'}));

  return mats[filename];
}

/**
 * @param {string} sessionId
 * @param {Array<number>} mat
 * @return {Promise}
 */
export default function(sessionId, mat) {
  return new Promise((resolve, reject)=>{
    client.get(sessionId, (err, result)=>{
      if (err) return reject(err);

      /** @type {import('../../models/IDBSession.js').IDBSession} */
      result = JSON.parse(result);

      const imageMat = getMat(result.image);
      const trueArgmax = argmaxThresh(imageMat.mat, 0.2).join(',');
      const userArgmax = argmaxThresh(mat, 1).join(',');

      if (userArgmax !== trueArgmax) {
        // TODO: Decrease the score based on mat dispersion
        // High variance = small reduction
        // Low variance = high reduction
        result.score -= 0.2;
      }

      pickRandomFile().then((image)=>{
        client.setex(sessionId, MAX_SESSION_TIME,
            Object.assign(result, {image: image}), (err)=>{
              if (err) return reject(err);
              resolve();
            });
      });
    });
  });
}
