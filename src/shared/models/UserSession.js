
/**
 * User session model
 * @type {Object} Session Represents a Session Object.
 * @property {string | undefined} _sessionIds Internal The Id of the Session
 * @property {string | undefined} _imageUrl Internal The Image Url
 * @property {string | undefined} imageUrl Public The Image Url
 * @property {string | undefined} sessionId Public The Image Url
 */
export class Session {
  /**
   * Set the Session._sessionId
   * @param {string} id
   */
  set sessionId(id) {
    if (id.length !== 8) throw Error("ClientID is not 8 characters");
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
   * Set the image URL for the initial challenge
   * @param {string} url
   */
  set imageUrl(url) {
    this._imageUrl = url;
  }

  /**
   * Get the image URL for the initial challenge
   * @type {string}
   */
  get imageUrl() {
    return this._imageUrl;
  }

  /**
   * Serialize the session into a JSON object
   * @return {Array<any>}
   */
  serialize() {
    const {sessionId, imageUrl} = this;
    if (!sessionId || !imageUrl) {
      throw Error("Unable to serialize because of missing field(s)");
    }
    return [sessionId, imageUrl];
  }

  /**
   * Deserialize session data from JSON object
   * @param {Array<any>} payload
   */
  deserialize([sessionId, imageUrl]) {
    Object.assign(this, {sessionId, imageUrl});
  }
};

export default Session
;
