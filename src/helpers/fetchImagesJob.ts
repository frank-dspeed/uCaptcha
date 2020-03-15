import {CronJob} from "cron";
import request from "request";
import path from "path";
import {IMAGES_FOLDER} from "../R";

import {OSCResponse} from "../types/OSCResponse";

import {randomBytes} from "./utils";
import Jimp from "jimp";

async function saveImage(filepath: string, uri: string) {
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

export function fetchImages({lat=40.6971576, lng=-83.608754, radius=5000} = {}) {
  console.log("Collecting images...");
  const requestBody = {
    lat,
    lng,
    radius
  };
  request("https://openstreetcam.org/1.0/list/nearby-photos/", {formData: requestBody, method: "POST"}, async (apiError, _, body) => {
    if (apiError) throw apiError;
    const json = JSON.parse(body);
    for (const item of (json as OSCResponse).currentPageItems) {
      const filepath = path.join(IMAGES_FOLDER, randomBytes(12) + ".jpg");
      console.log(filepath);
      await saveImage(filepath, `https://openstreetcam.org/${item.lth_name}`);
    }
  });
}

export const fetchImagesJob = new CronJob("0 0 0 * * *", () => {
  fetchImages();
}, null, true);
