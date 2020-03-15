import pickRandomFile from "./pickRandomFile";


export default async function() {
  const image = await pickRandomFile();
  return image;
}