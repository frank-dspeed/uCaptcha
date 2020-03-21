import initializeSession from './helpers/initializeSession.js';
import getImage from './helpers/getImage.js';
import verifyImage from './helpers/verifyImage.js';

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
    style: 'cursor:pointer;border-radius:3px;border:2px solid #888;width:25px;height:25px;display:inline-block',
  });

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

/**
 * Short hand for document.createElement
 * @param {string} tagName Tag name
 * @param {object} attributes A key-value pair of DOM attributes
 * @return {HTMLElement}
 */
function createElement(tagName, attributes={}) {
  const elem = document.createElement(tagName);
  for (const [name, value] of Object.entries(attributes)) {
    elem.setAttribute(name, value);
  }
  return elem;
}
