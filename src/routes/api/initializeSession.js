/**
 * TODO: this code should maybe be the constructor of a session model
 */
import pickRandomFile from './pickRandomFile.js';
import UserSession from '../../shared/models/UserSession.js';
import {randomBytes} from '../../helpers/utils.js';
import {client} from '../../helpers/idb.js';
import {MAX_SESSION_TIME} from '../../R.js';

/**
 * @typedef {import('../../models/IDBSession.js').IDBSession} IDBSession
 */


/**
 * @param {string} websiteKey
 * @param {Object} cookies
 * @return {UserSession}
 */
export default async function initializeSession(websiteKey, cookies) {
  let randomSessionId;

  if (cookies[websiteKey]) {
    randomSessionId = cookies[websiteKey];

    const session = new UserSession();
    session.sessionId = randomSessionId;
    session.websiteKey = websiteKey;

    return session;
  } else {
    randomSessionId = randomBytes(8);
  }

  const image = await pickRandomFile();

  const session = new UserSession();
  session.sessionId = randomSessionId;
  session.websiteKey = websiteKey;

  /** @type {IDBSession} */
  const idbPayload = {
    sessionId: session.sessionId,
    websiteKey: session.websiteKey,
    image,
    score: 0.5,
  };

  client.setex(
      session.sessionId, MAX_SESSION_TIME, JSON.stringify(idbPayload));

  return session;
};
