import initializeSession from './helpers/initializeSession.js';
import getImage from './helpers/getImage.js';
import verifyImage from './helpers/verifyImage.js';
import {cE as createElement} from './util/documnet.js';

/**
 * Create a uCaptcha box
 * @param {string} websiteKey Website key
 * @return {HTMLElement} uCaptcha box
 */
function uCaptchaBox(websiteKey) {
  const styles = `
    #ucaptcha-next {
      border: none;
      background-color: royalblue;
      color: #FFF;
      padding: 10px 20px;
      text-transform: uppercase;
      border-radius: 3px;
    }
    #ucaptcha-grid {
      width: 384px;
      height: 384px;
    }
    #ucaptcha-grid td {
      transition: .1s ease;
      cursor: pointer;
      padding: 10px;
    }

    #ucaptcha-grid td.selected {
      padding: 0;
      border: 10px solid white;
    }
    `;
  const styleTag = createElement('style');
  styleTag.innerHTML = styles;
  document.head.appendChild(styleTag);

  const checkbox = createElement('div', {
    style: 'height:25px;display:inline-block',
  });
  checkbox.style.cursor = 'pointer';
  checkbox.style.borderRadius = '3px';
  checkbox.style.border = '2px solid #888';
  checkbox.style.width = '25px';

  const captchaBox = createElement('div');
  captchaBox.appendChild(checkbox);

  const imageContainer = createElement('div', {id: 'ucaptcha-container'});

  const image = createElement('img', {id: 'ucaptcha-img', style: 'position:absolute;display:block;z-index:-999'});
  imageContainer.appendChild(image);

  const btn = createElement('button', {id: 'ucaptcha-next'});
  btn.textContent = 'Next';

  captchaBox.appendChild(imageContainer);
  captchaBox.appendChild(btn);

  checkbox.onclick = async function() {
    /** @type {import('../shared/models/UserSession.js').UserSession} */
    const session = await initializeSession(websiteKey);

    const imageGrid = createElement('table', {id: 'ucaptcha-grid'});
    for (let i = 0; i < 4; i++) {
      const tr = createElement('tr');
      for (let ii = 0; ii < 4; ii++) {
        const td = createElement('td',
            {'style': 'cursor:pointer'});
        td.addEventListener('click', (e)=>{
          e.target.classList.toggle('selected');
        });
        tr.appendChild(td);
      }
      imageGrid.appendChild(tr);
    }

    btn.addEventListener('click', (e)=>{
      verifyImage(session, imageGrid);
      getImage(session, captchaBox);
    });

    imageContainer.appendChild(imageGrid);

    getImage(session, captchaBox);

    checkbox.setAttribute('style',
        checkbox.getAttribute('style') + 'background-color:royalblue;');
  };
  return captchaBox;
}

/**
 * Instantiate a uCaptcha box
 * @param {string} websiteKey
 * @param {string} selector
 */
export function create(websiteKey, selector) {
  // const iframe = createElement("iframe");
  // iframe.setAttribute("src", "https://localhost:444/?k="+websiteKey)

  document.querySelector(selector).appendChild(uCaptchaBox(websiteKey));
}


