import request from '../util/request.js';
import UserSession from '../../shared/models/UserSession.js';

/**
 * @param {string} websiteKey
 * @return {Promise<UserSession>}
 */
export default async function initializeSession(websiteKey) {
  return request(`/api/init?k=${websiteKey}`)
      .then((resp) => {
        console.log(resp);
        const session = new UserSession();
        session.deserialize(resp);
        return session;
      });
}
