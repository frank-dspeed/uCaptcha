import UserSession from './shared/models/UserSession.js';

/**
 * Create a uCaptcha box
 * @param {string} key Website key
 * @return {HTMLElement} uCaptcha box
 */
function uCaptchaBox(key) {
  const checkbox = createElement('div', {
    style: 'cursor:pointer;border-radius:3px;border:2px solid #888;width:25px;height:25px;display:inline-block',
  });
  checkbox.onclick = function() {
    fetch(`https://localhost:444/api/init?k=${key}`)
        .then((r)=>r.text())
        .then((r)=>r.substr(2))
        .then((r)=>JSON.parse(r))
        .then((resp)=>{
          const session = new UserSession();
          session.deserialize(resp);
        });

    checkbox.setAttribute('style',
        checkbox.getAttribute('style') + 'background-color:royalblue;');
  };
  const captchaBox = createElement('div');
  captchaBox.appendChild(checkbox);
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
