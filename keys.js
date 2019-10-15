console.log('this is loaded');

var keys = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

module.exports = {
  keys: keys
};