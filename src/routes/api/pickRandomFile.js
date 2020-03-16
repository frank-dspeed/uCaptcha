const fs = require("fs");
const path = require("path");
const Jimp = require("jimp");
const {promisify} = require("util");

const {IMAGES_FOLDER} = require("../../R.js");

const readdirAsync = promisify(fs.readdir);

/**
 * @return {string} Image file path
 */
module.exports = async function() {
  const files = await readdirAsync(IMAGES_FOLDER);

  return files[Math.floor(Math.random() * files.length)];

  const randomFilePath = path.join(
      IMAGES_FOLDER,
      files[Math.floor(
          Math.random() * files.length
      )]
  );
  return randomFilePath;
};
