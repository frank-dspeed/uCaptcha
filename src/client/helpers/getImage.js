import request from '../util/request.js';
/**
 * @typedef { import('../../models/UserSession.js').UserSession } UserSession
 */

/**
 * Instantiate the uCaptcha loop
 * @param {UserSession} session
 * @param {HTMLElement} captchaBox
 */
export default function instantiateLoop(session, captchaBox) {
  console.log(captchaBox);
  request(`/api/image?s=${session.sessionId}`, {responseType: 'blob'})
      .then((blob)=>{
        const imageUrl = URL.createObjectURL(blob);
        console.log(imageUrl);
        captchaBox
            .querySelector('#ucaptcha-container')
            .querySelector('#ucaptcha-img')
            .setAttribute('src', imageUrl);
      });
}
