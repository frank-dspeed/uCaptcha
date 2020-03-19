/**
 * @typedef {Object} RequestOptions
 * @property {Object<string, any>} [body] Request body
 * @property {string} [method] Request method
 * @property {XMLHttpRequestResponseType} [responseType] Return raw response from server
 */

/** @type {RequestOptions} */
const defaultOptions = {
  method: 'GET',
  responseType: 'text', // Text because we will need to substr it.
};

/**
 * Make an HTTP request
 * @param {string} url
 * @param {RequestOptions} options
 * @return {Promise}
 */
export default function(url, options) {
  console.log(options);
  options = Object.assign({}, defaultOptions, options);
  console.log(options);
  return new Promise((resolve, reject)=>{
    const xhr = new XMLHttpRequest();
    xhr.open(options.method, url);

    xhr.responseType = options.responseType;

    xhr.onload = function() {
      if (this.status < 400) {
        if (options.responseType !== 'text') {
          resolve(this.response);
        } else {
          resolve(JSON.parse(this.responseText.substr(2)));
        }
      } else {
        reject(JSON.parse(this.responseText));
      }
    };

    if (options.method === 'POST') {
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify(options.body));
    } else {
      xhr.send();
    }
  });
}
