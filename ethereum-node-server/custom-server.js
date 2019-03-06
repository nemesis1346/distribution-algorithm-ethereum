const express = require('express');
const app = express();
const port = 3012 || process.env.PORT;
const trackEndpoint = require('./connection/trackEndpoint.js')
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use('/', express.static('public_static'));

app.listen(port, () => {

    trackEndpoint.createTrack();
    console.log("Express Listening at http://localhost:" + port);

});
