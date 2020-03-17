import cron from 'cron';
const CronJob = cron.CronJob;
import request from 'request';
import path from 'path';
import {IMAGES_FOLDER} from '../R.js';
import {randomBytes} from './utils.js';
import Jimp from 'jimp';


/**
 * @typedef {object} currentPageItem
 * @property {string} id
 * @property {string} sequence_id
 * @property {string} sequence_index
 * @property {string} lat
 * @property {string} ing
 * @property {string} name
 * @property {string} lth_name
 * @property {string} th_name
 * @property {string} date_added
 * @property {string} timestamp
 * @property {string|any} match_segment_id
 * @property {string} match_lat
 * @property {string} match_lng
 * @property {string} way_id
 * @property {string} shot_date
 * @property {string} heading
 * @property {string} headers
 * @property {string} gps_accuracy
 * @property {string} username
 */

/**
 * @typedef {object} OSCResponse.status
 * @property {string} apiCode
 * @property {string} apiMessage
 * @property {number} httpCode
 * @property {string} httpMessage
 */
// * @param {import('../types/OSCResponse.js').status} status
/**
 * @typedef {object} OSCResponse
 * @property {OSCResponse.status} status
 * @property {Array.<currentPageItem>} currentPageItems
 * @property {Array.<string>} totalFilteredItems
*/

/**
 * Save an image to disk
 * @param {string} filepath
 * @param {string} uri
 */
async function saveImage(filepath, uri) {
  return new Promise((resolve, reject)=>{
    Jimp.read(uri)
        .then((image)=>{
          let x;
          if (image.getWidth() / 2 < 400) {
            x = 0;
          } else {
            x = image.getWidth() / 2 - 200;
          }
          const y = image.getHeight() - 400;
          image
              .crop(x, y, 384, 384)
              .write(filepath, (err)=>{
                if (err) {
                  reject(err);
                } else {
                  resolve();
                }
              });
        });
  });
}
/**
 * @typedef {object} geoImageRequest
 * @property {number} [lat]
 * @property {number} [lng]
 * @property {number} [radius]
 */

/** @type {geoImageRequest} geoImageRequestDefaults */
const geoImageRequestDefaults = {
  lat: 40.624592,
  lng: -81.785149,
  radius: 5000,
};

/**
 * fetch and saves image from nearby photos
 * @param {geoImageRequest} [geoImageRequest] - Optional set a geoImageReqest
 */
export function fetchImages(geoImageRequest) {
  console.log('Collecting images...');
  const formData = {
    ...geoImageRequestDefaults,
    ...geoImageRequest,
  };
  request('https://openstreetcam.org/1.0/list/nearby-photos/', {formData, method: 'POST'}, async (apiError, _, body) => {
    if (apiError) throw apiError;
    /** @type {OSCResponse} */
    const json = JSON.parse(body);
    for (const item of (json).currentPageItems) {
      const filepath = path.join(IMAGES_FOLDER, `${randomBytes(12)}.jpg`);
      console.log(filepath);
      await saveImage(filepath, `https://openstreetcam.org/${item.lth_name}`);
    }
  });
}

export const fetchImagesJob = new CronJob('0 0 0 * * *', () => {
  fetchImages(geoImageRequestDefaults);
}, null, true);


export default {
  fetchImages,
  fetchImagesJob,
};
