require('dotenv').config();

const express = require('express');
const hbs = require('hbs');
const path = require('path')

// require spotify-web-api-node package here:
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
hbs.registerPartials( __dirname + '/views/partials');

// setting the spotify-api goes here:
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
});

// Retrieve an access token
spotifyApi
    .clientCredentialsGrant()
    .then(data => spotifyApi.setAccessToken(data.body['access_token']))
    .catch(error => console.log('Something went wrong when retrieving an access token', error));

// Our routes go here:
app.get("/", (req, res, next)=>{res.render('index')});


app.get("/artist-search", (req, res, next) => {
    spotifyApi.searchArtists(req.query.myArtist)

} )

app.listen(3004, () => console.log('My Spotify project running on port 3004 🎧 🥁 🎸 🔊'));
