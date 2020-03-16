/**
 * @param {Response} res
 * @param {object} json
 */
module.exports = function(res, json) {
  res.setHeader("Content-Type", "application/json");
  res.send(":)" + JSON.stringify(json));
  return;
};
