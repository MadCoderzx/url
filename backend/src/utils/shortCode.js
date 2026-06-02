const CHARSET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const CODE_LENGTH = 8;

function randomChar() {
  return CHARSET.charAt(Math.floor(Math.random() * CHARSET.length));
}

function generateShortCode() {
  return Array.from({ length: CODE_LENGTH }, randomChar).join('');
}

module.exports = {
  generateShortCode,
};
