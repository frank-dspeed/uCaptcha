import request from './util/request.js';
import UserSession from '../../shared/models/UserSession.js';

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
