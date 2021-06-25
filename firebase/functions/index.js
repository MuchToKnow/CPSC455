const app = require('express')();
const listingRouter = require('./routes/listings');
const authMiddleware = require('./middleware/auth');
const functions = require('firebase-functions');

// Uncomment to enable authentication.
//app.use(authMiddleware);
app.use('/listings', listingRouter);
exports.api = functions.https.onRequest(app);
