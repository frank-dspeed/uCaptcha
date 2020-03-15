import pickRandomFile from "./pickRandomFile.js";


export default async function() {
  const image = await pickRandomFile();
  return image;
}
