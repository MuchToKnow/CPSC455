const app = require('express')();
const listingRouter = require('./routes/listings');
const bookingRouter = require('./routes/bookings');
const reviewRouter = require('./routes/reviews');
const functions = require('firebase-functions');
const cors = require('cors');

app.options('*',cors());
app.use(cors());
app.use('/listings', listingRouter);
app.use('/bookings', bookingRouter);
app.use('/reviews', reviewRouter);
exports.api = functions.https.onRequest(app);
