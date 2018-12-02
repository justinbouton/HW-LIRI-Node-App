// Step 1
// Loads environment variables .env, .keys and fs
require('dotenv').config() 
const keys = require('./keys.js')
const fs = require('fs');


//Declare required var for APIs: Node-Spotify-api, OMDBapi and bandsintown utilize request.
const Spotify = require("node-spotify-api");
const request = require('request');
const moment = require('moment');

// Input for switch statement
const input1 = process.argv[2];

// Store and join all of the process arguments
var input2ConCat = process.argv.slice(3).join(" ");

// input1 valid?
if (!input1) {
    console.log('\n\n\n\n\n\nPLEASE ENTER A SEARCH PARAMATER "song", "movie" or "band"\n\n\n\n\n');
    console.log('Example: node liri.js song <name>\n\n\n\n\n\n');
}

//if input2ConCat does not have a value do not display Searching, instead show error and continue to switch statement.
if (input2ConCat) {
    console.log("\nSearching for " + input1 + ": " + input2ConCat.trim())
} else {
    var input1UpCase = input1.toUpperCase()
    console.log('\n\n\n\n\nPLEASE INCLUDE A PARAMATER IN YOUR ' + input1UpCase + ' SEARCH \n\n\n\n\n')
    console.log('Example: node liri.js ' + input1 + ' <name>\n\n\n\n\n\n')
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
        bandsSearch()
    break;
    
    case "random":
        randomSearch()
    break;
}

// Step 3
// If "songSearch" function is called
function songSearch() {

    toLog = input1 + ' ' + input2ConCat;
    fs.appendFile('songLog.txt', toLog, function(err){
        if (err) throw err;
    })

    if (input2ConCat.length === 0) {
        input2ConCat = "The Sign Ace of Base"; 
        console.log('\n\nMight we suggest: ')
    }   
        spotify = new Spotify(keys.spotify);

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
            });
};

// If "movieSearch" function is called
function movieSearch() {

    toLog = input1 + ' ' + input2ConCat;
    fs.appendFile('movieLog.txt', toLog, function(err){
        if (err) throw err;
    })
    
    if (input2ConCat.length === 0) {
        input2ConCat = "Mr Nobody"; 
        console.log('\nMight we suggest: ')
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

    toLog = input1 + ' ' + input2ConCat;
    fs.appendFile('bandLog.txt', toLog, function(err){
        if (err) throw err;
    })
    
    // if (input2ConCat.length === 0) {
    //     input2ConCat = "Justin Timberlake";
    //     console.log("\n" + input2ConCat);
    // }

    var queryUrl = 'https://rest.bandsintown.com/artists/' + input2ConCat + '/events?app_id=' + process.env.bands_key

    request(queryUrl, function (error, response, body) {
        
        let results = JSON.parse(body);
        
        if (results.length === 0) {
            console.log("\n\nSorry no results, try another band.\n\n")
        }
    
        if (error) { // Print the error if one occurred
            console.log('Error: ', error)
            console.log('statusCode: ', response && response.statusCode);
        };
                        
        results.forEach(function(event) { // For Each Veune name, City and Date.
            let name = event.venue.name
            let city = event.venue.city
            let date = moment(event.datetime).format("MM/DD/YYYY")
            console.log("\r\n");
            console.log("Date: " + date);
            console.log("Venue: " + name);
            console.log("Location: " + city);
            });
        });
};

// If "randomSearch() funtion is called
function randomSearch() { // Access ./random.txt using fs then call songSearch()

    fs.readFile("random.txt", "utf-8", function(err, data) {
        if (err) {throw err}
        input = data
        console.log('!!!  IGNORE RESPONSE ABOVE  !!!')
        console.log("Read random.txt: " + input)
        spotify = new Spotify(keys.spotify);
        spotify
            .search({ type: 'track', query: input })
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
            });
    })
} // UPGRADE // create array from random.txt, use random to make a selection then run songSearch()
// UPGRADE // DRY for randomSearch()