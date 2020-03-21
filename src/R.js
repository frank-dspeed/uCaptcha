import path from 'path';
import {fileURLToPath} from 'url';
const __dirname = fileURLToPath(import.meta.url);

export const PROJECT_ROOT = process.cwd();

/**
 * A path string relative to the project folder.
 * @typedef {String} IMAGES_FOLDER
 */
export const IMAGES_FOLDER = path.join(PROJECT_ROOT, 'public', 'images');

export const MAX_SESSION_TIME = 60 * 30;
