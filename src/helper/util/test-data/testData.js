// testData.js

const { getRandomInt } = require('./randomGenerator');

const randomValuePhone = getRandomInt(1234567891, 9999999999);
const randomValuePasscode = getRandomInt(2222, 9999);
module.exports = {
    randomValuePhone,
    randomValuePasscode
};
