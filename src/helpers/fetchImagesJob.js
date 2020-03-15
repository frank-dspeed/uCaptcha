import {CronJob} from "cron";
import request from "request";
import path from "path";
import {IMAGES_FOLDER} from "../R.js";

/**
 * @typedef {Object} currentPageItem
 * @property {String} id
 * @property {String} sequence_id
 * @property {String} sequence_index
 * @property {String} lat
 * @property {String} ing
 * @property {String} name
 * @property {String} lth_name
 * @property {String} th_name
 * @property {String} date_added
 * @property {String} timestamp
 * @property {String|Any} match_segment_id
 * @property {String} match_lat
 * @property {String} match_lng
 * @property {String} way_id
 * @property {String} shot_date
 * @property {String} heading
 * @property {String} headers
 * @property {String} gps_accuracy
 * @property {String} username
 */

/**
 * @typedef {Object} OSCResponse.status
 * @property {String} apiCode
 * @property {String} apiMessage
 * @property {Number} httpCode
 * @property {String} httpMessage
 */
//* @param {import('../types/OSCResponse.js').status} status
/**
 * @typedef {Object} OSCResponse
 * @property {OSCResponse.status} status
 * @property {Array.<currentPageItem>} currentPageItems
 * @property {Array.<String>} totalFilteredItems
*/

import {randomBytes} from "./utils.js";
import Jimp from "jimp";

/**
 * saves a image to disk
 * @param {string} filepath
 * @param {string} uri
 */
async function saveImage(filepath, uri) {
  return new Promise((resolve, reject)=>{
    Jimp.read(uri)
        .then((image)=>{
          image
              .crop(0, 0, 384, 384)
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
 * @typedef {Object} geoImageRequest
 * @property {Number} [lat]
 * @property {Number} [lng]
 * @property {Number} [radius]
 */

/** @type {geoImageRequest} geoImageRequestDefaults */
const geoImageRequestDefaults = {
  lat: 40.6971576,
  lng: -83.608754,
  radius: 5000
};

/**
 * fetch and saves image from nearby photos
 * @param {geoImageRequest} [geoImageRequest] - Optional set a geoImageReqest
 */
export function fetchImages(geoImageRequest) {
  console.log("Collecting images...");
  const formData = {
    ...geoImageRequestDefaults,
    ...geoImageRequest
  };
  request("https://openstreetcam.org/1.0/list/nearby-photos/", {formData, method: "POST"}, async (apiError, _, body) => {
    if (apiError) throw apiError;
    /** @type {OSCResponse} */
    const json = JSON.parse(body);
    for (const item of (json).currentPageItems) {
      const filepath = path.join(IMAGES_FOLDER, randomBytes(12) + ".jpg");
      console.log(filepath);
      await saveImage(filepath, `https://openstreetcam.org/${item.lth_name}`);
    }
  });
}

export const fetchImagesJob = new CronJob("0 0 0 * * *", () => {
  fetchImages(geoImageRequestDefaults);
}, null, true);
