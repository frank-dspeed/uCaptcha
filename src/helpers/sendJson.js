/**
 * @param {Response} res
 * @param {object} json
 */
export default (res, json) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(`:)${JSON.stringify(json)}`);
  return;
};
