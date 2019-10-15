// ===============================================
// Welcome to GARI 
// The Gibberish Analysis and Recognition Interface
// ===============================================
// INITIALIZATION

// Requirements
require("dotenv").config();
var keys = require("./keys.js");
var omdb = require("omdb");
var spotify = require("node-spotify-api");
var bandsInTown = require("bandsintown");
var inquirer = require("inquirer");
var moment = require("moment");
var axios = require("axios");

// Keys
var omdbKey = new omdb(keys.omdb);
var spotifyKey = new spotify(keys.spotify);
var bandsInTownKey = new bandsInTown(keys.bandsInTown);

// ===============================================
// FUNCTIONS
function concertThis() {

};

function spotifyThisSong() {
  
};

function movieThis() {
  omdb.search(userInput, function(err, movies){
    if(err) {
      return console.error(err);
    }

    if(movies.length < 1) {
        return console.log('No movies were found!');
    }

    movies.forEach(function(movie) {
      console.log('%s (%d)', movie.title, movie.year);
    });
  });
};

function doWhatItSays() {
  
};
// ===============================================
// INQUIRER PROMPT AND SWITCH STATEMENT

inquirer.prompt([
  {
    type: "list",
    name: "action",
    message: "What can I help you with today?",
    choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"]
  },
  {
    type: "input",
    name: "userInput",
    message: "Tell me what you would like to search:"
  }
]).then(function(action) {

  switch (action) {
    case "concert-this":
      concertThis();
      break;
  
    case "spotify-this-song":
        spotifyThisSong();
        break;
  
    case "movie-this":
        movieThis();
        break;
  
    case "do-what-it-says":
        doWhatItSays();
        break; 
  }
});
// ===============================================