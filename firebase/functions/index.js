const app = require('express')();
const listingRouter = require('./routes/listings');
const bookingRouter = require('./routes/bookings');
const functions = require('firebase-functions');
const cors = require('cors');

app.use(cors());
app.use('/listings', listingRouter);
app.use('/bookings', bookingRouter);
exports.api = functions.https.onRequest(app);
