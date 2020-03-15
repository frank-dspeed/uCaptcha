import fs from "fs";
import path from "path";
import Jimp from "jimp";
import {promisify} from "util";

import {IMAGES_FOLDER} from "../../R";

const readdirAsync = promisify(fs.readdir);

export default async function() {
  const files = await readdirAsync(IMAGES_FOLDER);

  return files[Math.floor(Math.random() * files.length)];

  const randomFilePath = path.join(IMAGES_FOLDER, files[Math.floor(Math.random() * files.length)])
  const image = await Jimp.read(randomFilePath)
  const base64 = await image.quality(20).getBase64Async(Jimp.MIME_JPEG);
  // console.log(base64)
  return base64;
}