/**
 * @typedef {Object} RequestOptions
 * @property {Object<string, any>} [body] Request body
 * @property {string} [method] Request method
 * @property {XMLHttpRequestResponseType} [responseType] raw response
 */

/** @type {RequestOptions} */
const defaultOptions = {
  method: 'GET',
  responseType: 'text', // Text because we will need to substr it.
};

/**
 * Make an HTTP request
 * @param {string} url
 * @param {RequestOptions} [userOptions]
 * @return {Promise} reqestPromise
 */
export async function request(url, userOptions={}) {
  const options = Object.assign({}, defaultOptions, userOptions);
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
export default request;
