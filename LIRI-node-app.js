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
var Spotify = require("node-spotify-api");

// Input for switch
var input1 = process.argv[2];

// Store all of the arguments in an array
var input2 = process.argv[3];

// Create an empty variable for holding the song name
var input2ConCat = "";

var input2 = process.argv;

var input2ConCat = "";

// Loop through all the words in the node argument
for (var i = 3; i < input2.length; i++) {
    input2ConCat = input2ConCat + " " + input2[i];
  }

console.log("70 Search: " + input2ConCat.trim())

// TODO // Create for loop to handle multiple words

// var omdb = require("omdbapi")
// var bandsInTown = require("bandsintownapi")


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
    //  console.log("Mode: " + input1 +" Search: " + input2)   
        var spotify = new Spotify({
            id: "d242dbfec5244fdbbdcc2e1769a3119c",
            secret: "5ee46c631ee341d6a114e9e34eb4d85b"
        });

        spotify
            .search({ type: 'track', query: input2ConCat })
            .then(function(data) {
                console.log("ARTIST: " + JSON.stringify(data.tracks.items[0].artists[0].name))// Artist(s)
                console.log("TITLE: " +JSON.stringify(data.tracks.items[0].name)) // Title
                console.log("ALBUM: " +JSON.stringify(data.tracks.items[0].album.name)) // Album
                console.log("CMD + DBL CLICK -> " + JSON.stringify(data.tracks.items[0].artists[0].external_urls.spotify)) // A link to preview the song
            })
            .catch(function(err) {
                console.log('Error occurred: ' + err);
            });
        // TODO* If no song is provided then your program will default to "The Sign" by Ace of Base.

      };


// If "movieSearch" function is called
function movieSearch() {
    //call omdbapi
}

// If "bandsSearch" function is called
function bandsSearch() {
    //call bandsintown-api
}