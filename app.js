const express = require('express');
const app = express();
const sitespeedio = require('sitespeed.io');
const schedule = require('node-schedule');

console.log("Scheduling...");

schedule.scheduleJob('*/1 * * * *', () => {
  console.log("Start job....");
  sitespeedio.run({
    urls: ["https://www.sitespeed.io/"],
    outputFolder: "/tmp/sitespeed-results",
    browsertime: {
      iterations: 1,
      browser: "chrome",
      chrome: {
        args: ["no-sandbox"]
      }
    },
    plugins: {
      list: true,
      remove: "html"
    }
  })
  .then((result) => {
    if (result.errors.length > 0) {
      console.log('========error========');
    } else {
      console.log('=======success=======');
    }
  });
});


console.log("Scheduling ok!...");

module.exports = app;
