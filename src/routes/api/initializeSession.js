/**
 * TODO: this code should maybe be the constructor of a session model
 */
import pickRandomFile from "./pickRandomFile.js";
import UserSession from "../../shared/models/UserSession.js";
import {randomBytes} from "../../helpers/utils.js";

/**
 * @return {any}
 */
export async function initializer() {
  const randomSessionId = randomBytes(8);
  const imageFilepath = await pickRandomFile();

  const initSession = new UserSession();
  initSession.setSessionId(randomSessionId);
  initSession.setImageUrl(imageFilepath);
  const payload = initSession.serialize();

  return payload;
};
