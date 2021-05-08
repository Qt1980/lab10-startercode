'use strict';

require('dotenv');
//require('dotenv').config(); is how to fix line.

const express = require('express');
const cors = require('cors');

const weather = require('./modules/weather.js');
const app = express();

//The line of code below is is needed to bring in line 7.
app.use(cors());

app.get('/weather', weatherHandler);

function weatherHandler(request, response) {
  const { lat, lon } = request.query;
  weather(lat, lon)
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(200).send('Sorry. Something went wrong!');
    });
}

app.listen(process.env.PORT, () => console.log(`Server up on ${process.env.PORT}`));


