import path from "path";
import { fileURLToPath } from 'url';
const __dirname = fileURLToPath(import.meta.url);
/**
 * A path string relative to the project folder.
 * @typedef {String} IMAGES_FOLDER
 */
export const IMAGES_FOLDER = path.join(__dirname, "..", "public", "images");