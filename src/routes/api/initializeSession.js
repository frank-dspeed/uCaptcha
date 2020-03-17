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
 * @return {any}
 */
export default async function initializeSession(websiteKey) {
  const randomSessionId = randomBytes(8);
  const image = await pickRandomFile();

  const session = new UserSession();
  session.sessionId = randomSessionId;
  const userPayload = session.serialize();

  /** @type {IDBSession} */
  const idbPayload = {
    sessionId: session.sessionId,
    image,
    score: 0.5,
  };

  client.setex(
      session.sessionId, MAX_SESSION_TIME, JSON.stringify(idbPayload));

  return userPayload;
};
