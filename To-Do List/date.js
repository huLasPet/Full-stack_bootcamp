function getTheDay(start, offset) {
  let today;
  if (start === null) {
    today = new Date();
  } else {
    today = new Date(start);
  }
  today.setDate(today.getDate() + parseInt(offset));
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
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
