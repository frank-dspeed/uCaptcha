/**
 * User session model
 * @type {Object} Session Object.
 * @property {string} _sessionId The session identifier
 */
export class UserSession {
  /**
   * Set session ID
   * @param {string} id
   */
  set sessionId(id) {
    if (id.length !== 8) throw Error('ClientID is not 8 characters');
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
   * Serialize the session into a JSON object
   * @return {Array<any>}
   */
  serialize() {
    const {sessionId} = this;
    if (!sessionId) {
      throw Error('Unable to serialize because of missing field(s)');
    }
    return [sessionId];
  }

  /**
   * Deserialize session data from JSON object
   * @param {Array<any>} payload
   */
  deserialize([sessionId]) {
    Object.assign(this, {sessionId});
  }
};

export default UserSession
;
