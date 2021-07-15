const app = require('express')();
const listingRouter = require('./routes/listings');
const functions = require('firebase-functions');
const cors = require('cors');

app.use(cors());
app.use('/listings', listingRouter);
exports.api = functions.https.onRequest(app);
