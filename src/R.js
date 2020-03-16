const path = require("path");


/**
 * A path string relative to the project folder.
 * @typedef {String} IMAGES_FOLDER
 */
const IMAGES_FOLDER = path.join(__dirname, "..", "public", "images");


module.exports = {
  IMAGES_FOLDER
};
