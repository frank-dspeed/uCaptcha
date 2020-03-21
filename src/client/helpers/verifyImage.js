import request from './util/request.js';
import UserSession from '../../shared/models/UserSession.js';

/**
 * Verify the image
 * @param {UserSession} session
 * @param {HTMLElement} captchaGrid
 */
export default async function(session, captchaGrid) {
  const tds = captchaGrid.querySelectorAll('td');
  const selectedTds = [];

  const mat = new Array(tds.length);
  for (let i = 0; i < tds.length; i++) {
    if (tds[i].classList.contains('selected')) {
      mat[i] = 1;
      selectedTds.push(tds[i]);
    } else {
      mat[i] = 0;
    }
  }

  const body = {
    s: session.sessionId,
    mat,
  };

  await request('/api/verify', {method: 'POST', body});

  selectedTds.map((td)=>{
    td.classList.remove('selected');
  });
}
