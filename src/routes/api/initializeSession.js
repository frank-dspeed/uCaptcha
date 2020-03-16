const pickRandomFile = require("./pickRandomFile.js");
const UserSession = require("../../shared/models/UserSession.js");
const utils = require("../../helpers/utils.js");


/**
 * @return {any}
 */
module.exports = async function() {
  const randomSessionId = utils.randomBytes(8);
  const imageFilepath = await pickRandomFile();

  const initSession = new UserSession();
  initSession.setSessionId(randomSessionId);
  initSession.setImageUrl(imageFilepath);
  const payload = initSession.serialize();

  return payload;
};
