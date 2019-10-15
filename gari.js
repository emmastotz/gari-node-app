// ===============================================
// Welcome to GARI 
// The Gibberish Analysis and Recognition Interface
// ===============================================
// INITIALIZATION

require("dotenv").config();

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

// ===============================================
// VARIABLES AND SWITCH STATEMENT

var inputString = process.argv;
var action = inputString[2];

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

// ===============================================
// FUNCTIONS
function concertThis() {

};

function spotifyThisSong() {
  
};

function movieThis() {
  
};

function doWhatItSays() {
  
};
// ===============================================