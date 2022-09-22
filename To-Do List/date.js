function getTheDay() {
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  let whatDay = today.toLocaleDateString("en-GB", options);
  return whatDay;
}

//export the module to be usable somewhere else by the name like this: exports."name"()
//so after a something = require("./name of this file") it can be used like something.name
//for example: customDate = require("./date") and use it like customDate.getTheDay()
//https://www.w3schools.com/nodejs/nodejs_modules.asp
//this way multiple functions can be exported from 1 file
exports.getTheDay = getTheDay;
