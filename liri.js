// Step 1
// Loads environment variables from .env
require('dotenv').config() 
const env = process.env

//Declare required var for APIs: Node-Spotify-api, OMDBapi and bandsintown utilize request.
const Spotify = require("node-spotify-api");
const request = require('request');
const moment = require('moment');
const fs = require('fs');

// Input for switch statement
const input1 = process.argv[2];

// Store and join all of the process arguments
var input2ConCat = process.argv.slice(3).join(" ");

// if input2ConCat does not have a value do not display Searching, instead show error and continue to switch statement.
if (input2ConCat) {
    console.log("\nSearching for " + input1 + ": " + input2ConCat.trim())
} else {
    var input1UpCase = input1.toUpperCase()
    console.log('\nPLEASE INCLUDE A PARAMATER IN YOUR ' + input1UpCase + ' SEARCH \n\nMight we suggest:')
}

// Step 2
//Create switch statment to handle requests song, movie, band
switch (input1) {
    case "song":
        songSearch()
    break;

    case "movie":
        movieSearch()
    break;

    case "band":
        if (!input2ConCat) {
            console.log("fix me too!")
        } else {
            bandsSearch()
        }
    break;
}

// Step 3
// If "songSearch" function is called
    
    function songSearch() {

        if (input2ConCat.length === 0) {
            input2ConCat = "The Sign Ace of Base"; 
        }
                spotify = new Spotify({
                    id: env.spotify_id, 
                    secret: env.spotify_secret
                });

                spotify
                    .search({ type: 'track', query: input2ConCat })
                    .then(function(data) {
                        console.log("\nArtist: " + JSON.stringify(data.tracks.items[0].artists[0].name))// Artist(s)
                        console.log("Title: " +JSON.stringify(data.tracks.items[0].name)) // Title
                        console.log("Album: " +JSON.stringify(data.tracks.items[0].album.name)) // Album
                        console.log("CMD + click -> " + JSON.stringify(data.tracks.items[0].artists[0].external_urls.spotify))
                        console.log() // A link to preview the song
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
            });
    };

// If "movieSearch" function is called
function movieSearch() {
    
    if (input2ConCat.length === 0) {
        input2ConCat = "Mr Nobody"; 
    }

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

            console.log('\nTitle: ' + title);
            console.log('Year: ' + year);
            console.log('IMDB rating: ' + imdbRating);
            console.log('Rotten Tomatoes rating: ' + rottenTomatoes);
            console.log('Country of production: ' + country);
            console.log('Langauge: ' + language);
            console.log('Plot: ' + plot);
            console.log('Actors: ' + actors);
            console.log() // Spacer, blank line
    }); 
}

// If "bandsSearch" function is called
function bandsSearch() {
    request('https://rest.bandsintown.com/artists/' + input2ConCat + '/events?app_id=' + process.env.omdb_key, function (error, response, body) {
        if (error) { // Print the error if one occurred
            console.log('Error: ', error)
            console.log('statusCode: ', response && response.statusCode);
        };
                
        let results = JSON.parse(body);
        
        results.forEach(function(event) { // For Each Veune name, City and Date.
            let name = event.venue.name
            let city = event.venue.city
            let date = moment(event.datetime).format("MM/DD/YYYY")
            console.log("\r\n");
            console.log("DATE: " + date);
            console.log("VENUE: " + name);
            console.log("LOCATION: " + city);
            // console.log("Date of the Event: " + date);
        })
    }); 
};