// =====================================================================================
// Welcome to GARI 
// The Gibberish Analysis and Recognition Interface
// =====================================================================================
// INITIALIZATION
// =====================================================================================
// Requirements
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var inquirer = require("inquirer");
var moment = require("moment");
var axios = require("axios");
var fs = require("fs");

// Key
var spotify = new Spotify(keys.keys);
// =====================================================================================
// INITIAL INQUIRER PROMPT AND SWITCH STATEMENT
// =====================================================================================
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
      concertThis("");
      break;
  
    case "spotify-this-song":
      spotifyThisSong("");
      break;
  
    case "movie-this":
      movieThis("");
      break;
  
    case "do-what-it-says":
      doWhatItSays();
      break; 
  }
});
// =====================================================================================
// FUNCTIONS
// =====================================================================================
// Concert This Function
function concertThis(item) {
  if (item == ""){
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
        if (response.data !== 'False') {
          for (var i = 0; i < response.data.length; i++){
            console.log("-----------------------------------------------------");
            console.log("Venue: " + response.data[i].venue.name); 
            console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region + ", " + response.data[i].venue.country);
            var date = moment(response.data[i].datetime).format('MM/DD/YYYY');
            console.log("Date: " + date);        
            console.log("-----------------------------------------------------");
          }
        } else {
          console.log("-----------------------------------------------------");
          console.log('No concerts found for this artist. Try again.');
          console.log("-----------------------------------------------------");
        }  
      })
      .catch(function(error) {
        console.log("-----------------------------------------------------");
        console.log("No artist found. Try again.");
        console.log("-----------------------------------------------------");
      })
      .finally(function() {
      });
    })
  } else {
  // =======================================
    var artistQuery = item.replace(/\s/g,'+').toLowerCase();
    var userQuery = "https://rest.bandsintown.com/artists/" + artistQuery + "/events?app_id=codingbootcamp";

    axios.get(userQuery)
    .then(function(response) {
      if (response.data !== 'False') {
        for (var i = 0; i < response.data.length; i++){
          console.log("-----------------------------------------------------");
          console.log("Venue: " + response.data[i].venue.name); 
          console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region + ", " + response.data[i].venue.country);
          var date = moment(response.data[i].datetime).format('MM/DD/YYYY');
          console.log("Date: " + date);        
          console.log("-----------------------------------------------------");
        }
      } else {
        console.log("-----------------------------------------------------");
        console.log('No concerts found. Try again.');
        console.log("-----------------------------------------------------");
      }
    });
  }
};
// =====================================================================================
// Spotify This Function
function spotifyThisSong(item) {
  if (item == ""){
    inquirer.prompt([
      {
        type: "input",
        name: "song",
        message: "What song would you like to spotify?"
      }
    ])
    .then(function(response){
      var userQuery = response.song.replace(/\s/g,'+').toLowerCase();
      if (userQuery !== ""){
        spotify.search({type: 'track', query: userQuery}, function(err, data) {
          if (!data) {
            console.log("-----------------------------------------------------");
            console.log("Song not found. Try again.");
            console.log("-----------------------------------------------------");
          } else {
            for (var i = 0; i < data.tracks.items.length; i++){
              console.log("-----------------------------------------------------")
              console.log("Artist[s]: " + data.tracks.items[i].album.artists[0].name);
              console.log("Song Name: " + data.tracks.items[i].name);
              console.log("Album Name: " + data.tracks.items[i].album.name);
              console.log("-----------------------------------------------------")
              console.log("Link to Spotify: " + data.tracks.items[i].album.href);
              console.log("-----------------------------------------------------")
            }
          }
        })
      } else {
        console.log("-----------------------------------------------------");
        console.log("Song not found. Try again.");
        console.log("-----------------------------------------------------");
      }
    })
  } else {
  // =======================================
    var userQuery = item.replace(/\s/g,'+').toLowerCase();

    spotify.search({type: 'track', query: userQuery}, function(err, data) {
      if (data !== data.tracks) {
        console.log("-----------------------------------------------------");
        console.log("Song not found. Try again.");
        console.log("-----------------------------------------------------");
      } else {
        for (var i = 0; i < data.tracks.items.length; i++){
          console.log("-----------------------------------------------------");
          console.log("Artist[s]: " + data.tracks.items[i].album.artists[0].name);
          console.log("Song Name: " + data.tracks.items[i].name);
          console.log("Album Name: " + data.tracks.items[i].album.name);
          console.log("-----------------------------------------------------")
          console.log("Link to Spotify: " + data.tracks.items[i].album.href);
          console.log("-----------------------------------------------------")
        }
      }
    })
  }
};
// =====================================================================================
// Movie This Function
function movieThis(item) {
  if (item == ""){
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
        if (response.data.Response !== "False") {
          console.log("-----------------------------------------------------");
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
          console.log("-----------------------------------------------------");
          console.log('Movie not found. Try again.');
          console.log("-----------------------------------------------------");
        }  
      })
      .catch(function(error) {
        console.log("-----------------------------------------------------");
        console.log("Movie not found. Try again.")
        console.log("-----------------------------------------------------");
      })
      .finally(function() {
      });
    });
  // =======================================
  } else {
    var movieQuery = item.replace(/\s/g,'+').toLowerCase();
    var userQuery = "http://www.omdbapi.com/?apikey=trilogy&t=" + movieQuery;

    axios.get(userQuery)
    .then(function(response) { 
      if (response.data.Response !== "False") {
        console.log("-----------------------------------------------------");
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
        console.log("-----------------------------------------------------");
        console.log('Movie not found. Try again.');
        console.log("-----------------------------------------------------");
      }  
    })
  }
};
// =====================================================================================
// Do What It Says Function
function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      console.log("-----------------------------------------------------");
      return console.log(error);
      console.log("-----------------------------------------------------");
    }

    console.log(data);

    var dataArr = data.split(',');
    console.log(dataArr);
    
    var action = dataArr[0];
    var item = dataArr[1];

    switch (action) {
      case "concert-this":
        concertThis(item);
        break;
    
      case "spotify-this-song":
        spotifyThisSong(item);
        break;
    
      case "movie-this":
        movieThis(item);
        break;
    }
  });
};
// =====================================================================================