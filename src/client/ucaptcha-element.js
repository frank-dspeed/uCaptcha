import UserSession from '../models/UserSession.js';
import {cE as createElement} from './util/documnet.js';
// References: https://developers.google.com/web/fundamentals/web-components/examples/howto-checkbox
import request from './util/request.js';

/**
 * Promise A+
 * @typedef {Promise} PromiseA
 * @property {*} promise
 */

/**
 *
 * @param {*} promise
 * @return {PromiseA}
 */
class APlusPromise {
  /**
   *
   * @param {*} promise
   */
  constructor(promise) {
    // Don't modify any promise that has been already modified.
    if (promise.isResolved) return promise;

    // Set initial state
    let isPending = true;
    let isRejected = false;
    let isFulfilled = false;

    // Observe the promise, saving the fulfillment in a closure scope.
    const result = promise.then(
        function(v) {
          isFulfilled = true;
          isPending = false;
          return v;
        },
        function(e) {
          isRejected = true;
          isPending = false;
          throw e;
        },
    );

    result.isFulfilled = function() {
      return isFulfilled;
    };
    result.isPending = function() {
      return isPending;
    };
    result.isRejected = function() {
      return isRejected;
    };
    return result;
  }
}

/**
 * Create a uCaptcha box
 * @param {HTMLElement} el
 * @return {string} uCaptcha box
 */
const uCaptachaCreate = (el)=>el.innerHTML = `<style>
#next {
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
#checkbox {
  cursor:pointer;
  border-radius:3px;
  border:2px solid #888;
  width:25px;
  height:25px;
  display:inline-block
}
img {
  position:absolute;
  display:block;
  z-index:-999
}
</style>
<div class="checkbox"></div>
<div class='container'>
    <img></img>
</div>
<button class="next">Next</button>
`;


/**
 * Create a uCaptcha box
 * @return {HTMLElement} uCaptcha box
 */
export class ucaptchaElement extends HTMLElement {
  /** @type {Promise<UserSession>} */
  get session() {
    const websiteKey = this.dataset.key;
    if (!this.sessionPromise) {
      const requestPromise = request(`/api/init?k=${websiteKey}`)
          .then((resp) => {
            console.log(resp);
            const session = new UserSession();
            session.deserialize(resp);
            return session;
          });
      this.sessionPromise = new APlusPromise(requestPromise);
    }
    return this.sessionPromise;
  }
  /**
   * Verify the image
   * @param {UserSession} session
   * @param {HTMLElement} captchaGrid
   */
  async verifyImage(session, captchaGrid) {
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

  /**
   * Instantiate the uCaptcha loop
   * @param {UserSession} session
   * @param {HTMLElement} captchaBox
   */
  getImage() {
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
  /**
   * Connected Callback
   */
  connectedCallback() {
    uCaptachaCreate(this);

    const checkbox = this.querySelector('.checkbox');
    const btn = this.querySelector('.next');
    const imageContainer = this.querySelector('.container');
    const websiteKey = this.dataset.key;

    this.addEventListener('click', async function() {
      /** @type {import('../models/UserSession.js').UserSession} */
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
        getImage(session, this);
      });

      imageContainer.appendChild(imageGrid);

      getImage(session, this);

      checkbox.setAttribute('style',
          checkbox.getAttribute('style') + 'background-color:royalblue;');
    });
  }
}
customElements.define('ucaptcha-element', ucaptchaElement);
/**
 * Instantiate a uCaptcha box
 * @param {string} key
 * @param {string} selector
 */
export function create(key, selector) {
  // const iframe = createElement("iframe");
  // iframe.setAttribute("src", "https://localhost:444/?k="+websiteKey)
  const ucaptcha = document.createElement('ucaptcha-element');
  ucaptcha.dataset.key = key;
  document.querySelector(selector).appendChild(ucaptcha);
}
// <ucaptacha-element data-key="xxxxxxxx"></ucaptcha-element>
