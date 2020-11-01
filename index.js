const fs = require("fs");
const csv = require("csvtojson");
const matchesPlayedPerYear = require("./ipl/matchesPlayedPerYear");
const noOfMatchesWonByEachTeam = require("./ipl/noOfMatchesWonByEachTeam");
const maxRunConsededByEachTeam = require("./ipl/maxRunConsededByEachTeam");
const topTenEconomicalBowlers = require("./ipl/topTenEconomicalBowlers");
const matchesPlayedByEachTeamPerVenue = require('./ipl/matchesPlayedByEachTeamPerVenue');

const MATCHES_FILE_PATH = "./csv_data/matches.csv";
const JSON_OUTPUT_FILE_PATH = "./public/data.json";
const DELIVERIES_FILE_PATH="./csv_data/deliveries.csv";
function main() {
  csv()
    .fromFile(MATCHES_FILE_PATH)
    .then(matches => {
      csv()
      .fromFile(DELIVERIES_FILE_PATH)
      .then(deliveries => {
      let result = matchesPlayedPerYear(matches);
      let result1 = noOfMatchesWonByEachTeam(matches);
      let result2 = maxRunConsededByEachTeam(matches);
      let result3 = topTenEconomicalBowlers(matches, deliveries);
      let result4 = matchesPlayedByEachTeamPerVenue(matches);
      saveMatchesPlayedPerYear(result,result1,result2,result3, result4);
      
      // saveNoOfMatchesWonByEachTeam(result1);
    });
  });
   /*csv()
    .fromFile(MATCHES_FILE_PATH)
    .then(matches => {
      let result1 = noOfMatchesWonByEachTeam(matches);
      saveNoOfMatchesWonByEachTeam(result1);
     });*/
}

function saveMatchesPlayedPerYear(result,result1,result2,result3, result4) {
  const jsonData = {
    matchesPlayedPerYear: result,
    noOfMatchesWonByEachTeam: result1,
    maxRunConsededByEachTeam: result2,
    topTenEconomicalBowlers: result3,
    matchesPlayedByEachTeamPerVenue: result4
  };
  const jsonString = JSON.stringify(jsonData);
  fs.writeFile(JSON_OUTPUT_FILE_PATH, jsonString, "utf8", err => {
    if (err) {
      console.error(err);
    }
  });}
/*function saveNoOfMatchesWonByEachTeam(result1) {
  const jsonData = {
    noOfMatchesWonByEachTeam: result1
  };
  const jsonString = JSON.stringify(jsonData);
  fs.writeFile(JSON_OUTPUT_FILE_PATH, jsonString, "utf8", err => {
    if (err) {
      console.error(err);
    }
  });*/


main();
