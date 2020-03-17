import {client} from '../../helpers/idb.js';

/**
 * @typedef {import('../../models/IDBSession.js').IDBSession} IDBSession
 */

/**
 * @param {string} sessionId
 * @return {Promise}
 */
export default function(sessionId) {
  return new Promise((resolve, reject)=>{
    client.get(sessionId, (err, result)=>{
      if (err) return reject(err);

      /** @type {IDBSession} */
      const sessionData = JSON.parse(result);

      console.log(sessionData);

      const {
        sessionId,
        image,
        score,
      } = sessionData;

      if (score < 0.1) {
        client.del(sessionId, (err)=>{
          if (err) return reject(err);

          return resolve([
            true,
            null,
          ]);
        });
      }

      return resolve([
        null,
        image + '.jpg',
      ]);
    });
  });
}
