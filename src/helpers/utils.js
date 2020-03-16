import crypto from 'crypto';

const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabc' +
  'defghijklmnopqrstuvwxyz0123456789';

/**
 * Produce a string of n length consisting of alphanumeric characters
 * @param {number} length
 * @return {string} Alphanumeric string
 */
function randomBytes(length) {
  const bytes = crypto.randomBytes(length);
  const chars = [];

  for (let i = 0; i < length; i++) {
    chars.push(alphabets[bytes[i] % alphabets.length]);
  }

  return chars.join('');
}


export {randomBytes};
