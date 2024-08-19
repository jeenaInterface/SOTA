const { getRandomInt } = require('./randomGenerator');


function generateRandomPhoneNumber() {
    const areaCode = getRandomInt(123, 999); // Random area code between 123 and 999
    const prefix = getRandomInt(123, 999); // Random prefix between 123 and 999
    const lineNumber = getRandomInt(1000, 9999); // Random line number between 1000 and 9999
  
    return `(${areaCode}) ${prefix}-${lineNumber}`;
  }
  function generateRandomName() {
    const firstNames = ['John', 'Emma', 'Michael', 'Olivia', 'William', 'Ava', 'James', 'Sophia', 'Robert', 'Isabella'];
    const lastNames = ['Smith', 'Johnson', 'Brown', 'Jones', 'Williams', 'Davis', 'Miller', 'Garcia', 'Martinez', 'Rodriguez'];
  
    const randomFirstName = firstNames[getRandomInt(0, firstNames.length - 1)];
    const randomLastName = lastNames[getRandomInt(0, lastNames.length - 1)];
  
    return `${randomFirstName} ${randomLastName}`;
  }
  
const randomName = generateRandomName();
const randomValuePhone = generateRandomPhoneNumber();
const randomValuePasscode = getRandomInt(2222, 9999);
module.exports = {
    randomValuePhone,
    randomValuePasscode,
    randomName
};
