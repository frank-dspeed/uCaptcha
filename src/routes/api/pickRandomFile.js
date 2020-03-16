import fs from 'fs';
import path from 'path';
import Jimp from 'jimp';
import {promisify} from 'util';
import {IMAGES_FOLDER} from '../../R.js';

const readdirAsync = promisify(fs.readdir);

/**
 * @return {string} Image file path
 */
export default async () => {
  const files = await readdirAsync(IMAGES_FOLDER);

  return files[Math.floor(Math.random() * files.length)];

  const randomFilePath = path.join(
      IMAGES_FOLDER,
      files[Math.floor(
          Math.random() * files.length,
      )],
  );
  return randomFilePath;
};
