const Indexes = {
  clientId: 0,
  imageUrl: 1
};

/** @typedef {Object} Session - Represents a Session Object.
 * @property {string | undefined} _sessionId - The Id of the Session
 * @property {string | undefined} _imageUrl - The Image Url from this Session
 */

/** @type {Session} */
module.exports = class Session {
  /**
   * User session model
   */
  constructor() {
    this._sessionId;

    this._imageUrl;
  }

  /**
   * Set the Session._sessionId for the user
   * @param {string} id
   */
  setSessionId(id) {
    if (id.length !== 8) throw Error("ClientID is not 8 characters");
    this._sessionId = id;
  }

  /**
   * Get the session ID for the user
   * @return {string}
   */
  get getSessionId() {
    this._sessionId;
  }

  /**
   * Set the image URL for the initial challenge
   * @param {string} url
   */
  setImageUrl(url) {
    this._imageUrl = url;
  }

  /**
   * Get the image URL for the initial challenge
   * @return {string}
   */
  getImageUrl() {
    return this._imageUrl;
  }

  /**
   * Serialize the session into a JSON object
   * @return {Array<any>}
   */
  serialize() {
    if (!this._sessionId || !this._imageUrl) {
      throw Error("Unable to serialize because of missing field(s)");
    }
    const payload = [];
    payload[Indexes.clientId] = this._sessionId;
    payload[Indexes.imageUrl] = this._imageUrl;

    return payload;
  }

  /**
   * Deserialize session data from JSON object
   * @param {Array<any>} payload
   */
  deserialize(payload) {
    this.setSessionId(payload[Indexes.clientId]);
    this.setImageUrl(payload[Indexes.imageUrl]);
  }
};
