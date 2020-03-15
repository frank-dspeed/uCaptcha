import crypto from "crypto";

const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function randomBytes(length: number) {
  const bytes = crypto.randomBytes(length);
  const chars = [];

  for (let i = 0; i < length; i++) {
    chars.push(alphabets[bytes[i] % alphabets.length]);
  }

  return chars.join("");
}