// ===============================================
// Welcome to GARI 
// The Gibberish Analysis and Recognition Interface
// ===============================================
// INITIALIZATION

// Requirements
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var inquirer = require("inquirer");
var moment = require("moment");
var axios = require("axios");

// Key
var spotify = new Spotify(keys.keys);

// ===============================================
// INQUIRER PROMPT AND SWITCH STATEMENT

inquirer.prompt([
  {
    type: "list",
    name: "action",
    message: "What can I help you with today?",
    choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"]
  }
]).then(function(action) {
  switch (action) {
    case "concert-this":
      concertThis();
      // break;
  
    case "spotify-this-song":
      spotifyThisSong();
      // break;
  
    case "movie-this":
      console.log("Here.");
      movieThis();
      // break;
  
    case "do-what-it-says":
      doWhatItSays();
      // break; 
  }
});
// ===============================================
// FUNCTIONS
function concertThis() {

};

function spotifyThisSong() {
  
};

function movieThis(userInput) {
  console.log("Inside movie-this function.");
  inquirer.prompt([
    {
      type: "input",
      name: "movie",
      message: "Tell me what movie you'd like to search:"
    }
  ])
  .then(function(response){
    var movieQuery = response.movie.replace(/\s/g,'');
    console.log(movieQuery);
    var userQuery = "http://img.omdbapi.com/?apikey=trilogy&t=" + movie;
    console.log(userQuery);
  })
  
};

function doWhatItSays() {
  
};
// ===============================================