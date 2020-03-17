import fs from 'fs';
import {IMAGES_FOLDER} from '../../R.js';

/**
 * @return {Promise<string>} Image file without extension
 */
export default () => {
  return new Promise((reject, resolve)=>{
    fs.readdir(IMAGES_FOLDER, (err, files)=>{
      if (err) return reject(err);
      return resolve(
          files[
              Math.floor(Math.random() * files.length)
          ].split('.')[0]);
    });
  });
};
