// Step 1
// Loads environment variables from .env
require('dotenv').config() 
const env = process.env

//Declare required var for APIs: Node-Spotify-api, OMDBapi, bandsintown
const Spotify = require("node-spotify-api");
const omdb = require("omdbapi")
// const bandsInTown = require("bandsintownapi")

// Input for switch
const input1 = process.argv[2];

// Store all of the arguments in an array
const input2 = process.argv;

// Create an empty variable for holding the song name
var input2ConCat = "";

//process.argv.slice(3).join(" ")
// Loop through all the words in the node argument
for (var i = 3; i < input2.length; i++) {
    if (input1 === "song") {
        input2ConCat += " " + input2[i]
    } if (input1 === "movie") {
        input2ConCat += "+" + input2[i]
    } if (input1 === "band") {
        input2 += "" + input2[i]
    } break;
  }

console.log("Searching for:" + input2ConCat.trim())


// Step 2
//Create switch statment to handle requests song, movie, band
// console.log("71 input: " + input1)
switch (input1) {
    case "song":
    songSearch();
    // console.log('Switch "song"')
    break;

    case "movie":
    movieSearch()
    break;

    case "band":
    bandsSearch()
    break;
}

// If "songSearch" function is called
    function songSearch() {
        
        // console.log(".env ID: " + env.spotify_id)
        // console.log(".env Key: " + env.spotify_secret)

        spotify = new Spotify({
            id: env.spotify_id, 
            secret: env.spotify_secret
        });

        spotify
            .search({ type: 'track', query: input2ConCat })
            .then(function(data) {
                console.log("ARTIST: " + JSON.stringify(data.tracks.items[0].artists[0].name))// Artist(s)
                console.log("TITLE: " +JSON.stringify(data.tracks.items[0].name)) // Title
                console.log("ALBUM: " +JSON.stringify(data.tracks.items[0].album.name)) // Album
                console.log("CMD + DBL CLICK -> " + JSON.stringify(data.tracks.items[0].artists[0].external_urls.spotify)) // A link to preview the song
            })
            .catch(function(err) { // on err console err and suggest an artist to checkout.
                console.log(" ")
                console.log('Error occurred: ' + err);
                console.log(" ")
                console.log('CHECKOUT THIS ARTIST');

                spotify = new Spotify({
                    id: env.spotify_id, 
                    secret: env.spotify_secret
                });
        
                spotify
                    .search({ type: 'track', query: "The Sign Ace of Base" })
                    .then(function(data) {
                        console.log("ARTIST: " + JSON.stringify(data.tracks.items[0].artists[0].name))// Artist(s)
                        console.log("TITLE: " + JSON.stringify(data.tracks.items[0].name)) // Title
                        console.log("ALBUM: " + JSON.stringify(data.tracks.items[0].album.name)) // Album
                        console.log("CMD + DBL CLICK -> " + JSON.stringify(data.tracks.items[0].artists[0].external_urls.spotify)) // A link to preview the song
                    })
                
            });
      };


// If "movieSearch" function is called
function movieSearch() {
    var request = require('request');
        request('http://www.omdbapi.com/?apikey='+ process.env.omdb_key +'&t=home+alone', function (error, response, body) {
            if (error) { // Print the error if one occurred
                console.log('Error:', error)
                console.log('statusCode:', response && response.statusCode);
            }; 
            
            let results = JSON.parse(body);
            let title = results.Title;
            let year = results.Year;
            let imdbRating = results.imdbRating;
            let rottenTomatoes = results.Ratings[1].Value;
            let country = results.Country;
            let language = results.Language;
            let plot = results.Plot;
            let actors = results.Actors;

            console.log('TITLE: ' + title);
            console.log('YEAR: ' + year);
            console.log('IMDB RATING: ' + imdbRating);
            console.log('ROTTEN TOMATOES RATING: ' + rottenTomatoes);
            console.log('COUNTRY OF PRODUCTION: ' + country);
            console.log('LANGAUGE: ' + language);
            console.log('PLOT: ' + plot);
            console.log('ACTORS: ' + actors);
    }); 
// TODO // * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
}

// If "bandsSearch" function is called
function bandsSearch() {
    //call bandsintown-api
}