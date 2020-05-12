
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("isomorphic-fetch");
const cors = require("cors");
const app = new express();
require('dotenv').config()




var corsOptions = {
  origin: "https://spotifybootcamp-e7d54.firebaseapp.com",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/spotify_access_token", cors(corsOptions), async (req, res, next) => {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_SECRET;

  console.log("ENV STUFF", clientId);

  // We need, annoyingly, a base64-encoded string of our id:secret, for spotify.
  // We can use Buffers to do this for us.
  const authString = Buffer.from(clientId + ":" + clientSecret).toString(
    "base64"
  );

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${authString}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  const spotAnswer = await response.json();
  console.log(spotAnswer);
  // TODO: use authString in a request to Spotify!
  return res.send(spotAnswer);
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server listening on port 3000");
});
