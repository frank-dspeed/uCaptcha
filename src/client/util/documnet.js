/**
 * Short hand for document.createElement
 * @param {string} tagName Tag name
 * @param {object} attributes A key-value pair of DOM attributes
 * @return {HTMLElement}
 */
export const cE = (tagName, attributes = {}) => {
  const elem = document.createElement(tagName);
  for (const [name, value] of Object.entries(attributes)) {
    elem.setAttribute(name, value);
  }
  return elem;
};
/**
 * Short hand for document.querySelector and querySelectorAll
 * @param {string} selector a html selector
 * @return {Element|NodeListOf<Element>}
 */
export const qS = (selector) => {
  const results = document.querySelectorAll(selector);
  return results.length === 1 ? results[0] : results;
}
;
