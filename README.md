# HW-LIRI-Node-App

LIRI is similar to SIRI. LIRI on the other hand is _Language_ interpretation and recongnition interface. SIRI is _Speech_.

The purpose of this node app is to be able to search multiple APIs from a single CLI. Your search will hit either Spotify, OMDB or Bands in town.


(Don't forget to run "npm init" in this folder first!)


1. Search Spotify for a song:

`node liri.js song <song name>`

* Returns the following:
    * Artist(s)
    * Title
    * Album
    * A link to preview the song


2. Search OMDB for a moive:

`node liri.js movie <movie title>`

* Returns the following:
    * Title of the movie.
    * Year the movie came out.
    * IMDB Rating of the movie.
    * Rotten Tomatoes Rating of the movie.
    * Country where the movie was produced.
    * Language of the movie.
    * Plot of the movie.
    * Actors in the movie.


3. Search for bands in town:

`node liri.js band <band name>`

* Returns the following:
    * Name of the venue
    * Venue location
    * Date of the event MM/DD/YY


4. Random search:

`node liri.js random`

* Returns item from song from random.txt