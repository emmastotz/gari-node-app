// =====================================================================================
// Welcome to GARI 
// The Gibberish Analysis and Recognition Interface
// =====================================================================================
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

// =====================================================================================
// INQUIRER PROMPT AND SWITCH STATEMENT

inquirer.prompt([
  {
    type: "list",
    name: "action",
    message: "What can I help you with today?",
    choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"]
  }
]).then(function(response) {
  switch (response.action) {
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
// =====================================================================================
// FUNCTIONS
function concertThis() {
  inquirer.prompt([
    {
      type: "input",
      name: "artist",
      message: "Tell me which artist you'd like to see in concert:"
    }
  ])
  .then(function(response){
    var artistQuery = response.artist.replace(/\s/g,'+').toLowerCase();
    var userQuery = "https://rest.bandsintown.com/artists/" + artistQuery + "/events?app_id=codingbootcamp";

    axios.get(userQuery)
    .then(function(response) {
      console.log(response.data);
      if (response.data !== '[]') {
        for (var i = 0; i < response.data.length; i++){
          console.log("Venue: " + response.data[i].venue.name); 
          console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region + ", " + response.data[i].venue.country);
          var date = moment(response.data[i].datetime).format('MM/DD/YYYY');
          console.log("Date: " + date);        
          console.log("-----------------------------------------------------");
        }
      }
      else {
        console.log('No concerts found. Try again.');
      }  
    })
    .catch(function(error) {
      console.log(error);
    })
    .finally(function() {
    });
  })
};
// ===============================================
function spotifyThisSong() {
  inquirer.prompt([
    {
      type: "input",
      name: "song",
      message: "What song would you like to spotify?"
    }
  ])
  .then(function(response){
  var userQuery = response.song.replace(/\s/g,'+').toLowerCase();
  console.log(userQuery);

  spotify.search({type: 'track', query: userQuery}, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    for (var i = 0; i < data.tracks.items.length; i++){
      console.log("Artist[s]: " + data.tracks.items[i].album.artists[0].name);
      console.log("Song Name: " + data.tracks.items[i].name);
      console.log("Album Name: " + data.tracks.items[i].album.name);
      console.log("");
      console.log("Link to Spotify: " + data.tracks.items[i].album.href);
      console.log("-----------------------------------------------------")
    }
    
    })
  })
};
// ===============================================
function movieThis() {
  inquirer.prompt([
    {
      type: "input",
      name: "movie",
      message: "Tell me what movie you'd like to search:"
    }
  ])
  .then(function(response){
    var movieQuery = response.movie.replace(/\s/g,'+').toLowerCase();
    var userQuery = "http://www.omdbapi.com/?apikey=trilogy&t=" + movieQuery;

    axios.get(userQuery)
    .then(function(response) { 
      // console.log(response.data);
      if (response.data.Response !== "False") {
        console.log("Title: " + response.data.Title); 
        console.log("Released: " + response.data.Year);
        console.log("IMDB Rating: " + response.data.Ratings[0].Value);
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
        console.log("Production Country: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
        console.log("-----------------------------------------------------")
      } else {
        console.log('Movie not found. Try again.');
      }  
    })
    .catch(function(error) {
      console.log(error);
    })
    .finally(function() {
    });
  })
};
// ===============================================  
function doWhatItSays() {
  fs.readFile();
};
// =====================================================================================