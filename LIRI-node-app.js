// 1. Search Spotify for a song:

// `node liri.js spotify <song name>`

// * Returns the following:
//     * Artist(s)
//     * Title
//     * Album
//     * A link to preview the song


// 2. Search OMDB for a moive:

// `node liri.js omdb <movie title>`

// * Returns the following:
//     * Title of the movie.
//     * Year the movie came out.
//     * IMDB Rating of the movie.
//     * Rotten Tomatoes Rating of the movie.
//     * Country where the movie was produced.
//     * Language of the movie.
//     * Plot of the movie.
//     * Actors in the movie.


// 3. Search for bands in town:

// `node liri.js bands <band name>`

// * Returns the following:
//     * Name of the venue
//     * Venue location
//     * Date of the event MM/DD/YY


// 4. Random search:

// `node liri.js random`

// * Returns song, movie or band search from random.txt




// 3. To retrieve the data that will power this app, you'll need to send requests to the Bands in Town, Spotify and OMDB APIs. You'll find these Node packages crucial for your assignment.

//    * [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)

//    * [Request](https://www.npmjs.com/package/request)

//      * You'll use Request to grab data from the [OMDB API](http://www.omdbapi.com) and the [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)

//    * [Moment](https://www.npmjs.com/package/moment)

//    * [DotEnv](https://www.npmjs.com/package/dotenv)

// Step 1
//Declare required var for APIs: Node-Spotify-api, OMDBapi, bandsintown
var spotify = require("node-spotify-api")
var omdb = require("omdbapi")
var bandsInTown = require("bandsintownapi")


// Step 2
//Create switch statment to handle requests song, movie, band

switch (action) {
    case "song":
    songSearch();
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
    //call Node-Spotify-api
}

// If "movieSearch" function is called
function movieSearch() {
    //call omdbapi
}

// If "bandsSearch" function is called
function bandsSearch() {
    //call bandsintown-api
}