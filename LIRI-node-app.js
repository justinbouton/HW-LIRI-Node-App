// Step 1
// Loads environment variables from .env
require('dotenv').config() 
const env = process.env

//Declare required var for APIs: Node-Spotify-api, OMDBapi, bandsintown
const Spotify = require("node-spotify-api");
const request = require('request');
// TODO // * const moment = require('moment');

// Input for switch statement
const input1 = process.argv[2];

// Store and join all of the process arguments
const input2ConCat = process.argv.slice(3).join(" ");

// if input2ConCat does not have a value do not display Searching...
if (input2ConCat) {
    console.log("Searching for:" + input2ConCat.trim())
}

// Step 2
//Create switch statment to handle requests song, movie, band
switch (input1) {
    case "song":
        if (!input2ConCat) {
            console.log("PLEASE INCLUDE A TITLE IN YOUR SONG SEARCH")
        } else {
            songSearch();
        }
    break;

    case "movie":
        if (input2ConCat === "") {
            console.log("fix me!"); // TODO // Return "Mr Nobody"
            break;
        } else {
            movieSearch()
        }
    break;

    case "band":
        if (!input2ConCat) {
            console.log("PLEASE INCLUDE A NAME IN YOUR BAND SEARCH")
        } else {
            bandsSearch()
        }
    break;
}

// Step 3
// If "songSearch" function is called
    function songSearch() {

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
//////////
// HELP // MAKE DRY // Function inside
//////////
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
        request('http://www.omdbapi.com/?apikey='+ process.env.omdb_key +'&t=' + input2ConCat, function (error, response, body) {
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
    request('https://rest.bandsintown.com/artists/' + input2ConCat + '/events?app_id=' + process.env.omdb_key, function (error, response, body) {
        if (error) { // Print the error if one occurred
            console.log('Error: ', error)
            console.log('statusCode: ', response && response.statusCode);
        };
                
        let results = JSON.parse(body);
        
        results.forEach(function(event) { // Loop through each Veune name, City and Date.
            let name = event.venue.name
            let city = event.venue.city
            // let date = moment(event.datetime).format("MM/DD/YYYY")
            console.log("\r\n");
            console.log("Venue: " + name);
            console.log("Location: " + city);
            // console.log("Date of the Event: " + date);
        })
    }); 
};