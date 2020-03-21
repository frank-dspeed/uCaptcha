import request from './util/request.js';
import UserSession from '../../shared/models/UserSession.js';

/**
 * @param {string} websiteKey
 * @return {Promise<UserSession>}
 */
export default function initializeSession(websiteKey) {
  return new Promise((resolve, reject)=>{
    request(`/api/init?k=${websiteKey}`)
        .then((resp)=>{
          console.log(resp);
          const session = new UserSession();
          session.deserialize(resp);
          resolve(session);
        })
        .catch((e)=>{
          reject(e);
        });
  });
}
