const bcryptjs = require("bcryptjs");

const SALT_NUM = 8;

const encrypt = async (password) => {
  const hash = await bcryptjs.hash(password, SALT_NUM);
  return hash;
}

const verifyHash = async (plainPass, hashPass) => {
  const isCorrect = await bcryptjs.compare(plainPass, hashPass);
  return isCorrect;
}

module.exports = {
  encrypt,
  verifyHash
}