/**
 * User session model
 * @type {Object} Session Object.
 * @property {string} _sessionId The session identifier
 * @property {string} _websiteKey The website id for session
 */
export class UserSession {
  /**
   * Set session ID
   * @param {string} id
   */
  set sessionId(id) {
    this._sessionId = id;
  }

  /**
   * Get the session ID
   * @type {string}
   */
  get sessionId() {
    return this._sessionId;
  }

  /**
   * Set session ID
   * @param {string} id
   */
  set websiteKey(id) {
    this._websiteKey = id;
  }

  /**
   * Get the session ID
   * @type {string}
   */
  get websiteKey() {
    return this._websiteKey;
  }

  /**
   * Serialize the session into a JSON object
   * @return {Array<any>}
   */
  serialize() {
    const {sessionId, websiteKey} = this;
    if (!sessionId || !websiteKey) {
      throw Error();
    }
    return [sessionId, websiteKey];
  }

  /**
   * Deserialize session data from JSON object
   * @param {Array<any>} payload
   */
  deserialize([sessionId, websiteKey]) {
    Object.assign(this, {sessionId, websiteKey});
  }
};

export default UserSession
;
