const express = require('express');
const router = express.Router();
const { v4: uuid } = require('uuid');
const db = require('../db');
const authMiddleware = require('../middleware/auth');

/* GET all bookings associated with user. */
router.get('/mine', authMiddleware, (req, res, next) => {
  db.getInstance(async (db) => {
    try {
      const result = await db.collection('bookings').find({ creatorUserId: req.user.uid }).toArray();
      res.status(200).json(result);
      return next();
    } catch (err) {
      res.status(400).json({ error: err });
      return next();
    }
  });
});

/* GET all bookings associated with listing. */
router.get('/byListing/:listingId', authMiddleware, (req, res, next) => {
  db.getInstance(async (db) => {
    try {
      const result = await db.collection('bookings').find({ listingId: req.params.listingId }).toArray();
      res.status(200).json(result);
      return next();
    } catch (err) {
      res.status(400).json({ error: err });
      return next();
    }
  });
});

/* GET single booking */
router.get('/:bookingId', authMiddleware, (req, res, next) => {
  db.getInstance(async (db) => {
    try {
      const result = await db.collection('bookings').findOne({ bookingId: req.params.bookingId });
      res.status(200).json(result);
      return next();
    } catch (err) {
      res.status(400).json({ error: err });
      return next();
    }
  });
});

/* POST create single booking. */
router.post('/', authMiddleware, (req, res, next) => {
  const { listingId, startDate, endDate } = req.body;
  if (!listingId || !startDate || !endDate) {
    res.status(400).json({ error: "Missing a param. Required params: listingId, startDate, endDate" });
  }
  const bookingObj = {
    creatorUserId: req.user.uid,
    email: req.user.email,
    bookingId: uuid(),
    ...req.body
  };
  db.getInstance(async (db) => {
    try {
      const currentBookings = await db.collection('bookings').find({ listingId: listingId }).toArray();
      for (const booking in currentBookings) {
        const existingStart = new Date(booking.startDate);
        const existingEnd = new Date(booking.endDate);
        const newStart = new Date(startDate);
        const newEnd = new Date(endDate);
        if (existingStart <= newEnd && newStart <= existingEnd) {
          res.status(400).json({ error: "Booking date overlaps with an existing booking" });
          return next();
        }
      }
    } catch (err) {
      res.status(400).json({ error: err });
      return next();
    }
    try {
      await db.collection('bookings').insertOne(bookingObj);
      res.status(201).json("Success");
      return next();
    } catch (err) {
      res.status(400).json({ error: err });
      return next();
    }
  });
});

/* DELETE delete single booking */
router.delete('/:bookingId', authMiddleware, (req, res, next) => {
  if (!req.user || !req.user.uid) {
    res.status(401).json({ error: "Unauthorized, no user id available" });
    return next();
  }
  db.getInstance(async (db) => {
    try {
      const result = await db.collection('bookings').findOne({ bookingId: req.params.bookingId });
      if (!result.creatorUserId || result.creatorUserId !== req.user.uid) {
        res.status(401).json({ error: "Unauthorized" });
        return next();
      }
    } catch (err) {
      res.status(400).json({ error: err });
      return next();
    }

    try {
      await db.collection('bookings').deleteOne({ bookingId: req.params.bookingId });
      res.status(200).json("Success");
      return next();
    } catch (err) {
      res.status(400).json({ error: err });
      return next();
    }
  });
});

// /* PUT update single listing */
// router.put('/:listingId', authMiddleware, (req, res, next) => {
//   if (!req.user || !req.user.uid) {
//     res.status(401).json({ error: "Unauthorized, no user id available" });
//     return next();
//   }
//   // Not the most secure, but only the owner of the document can call these so it's not an issue.
//   const updateDoc = {
//     $set: req.body
//   };
//   db.getInstance(async (db) => {
//     try {
//       const result = await db.collection('listings').findOne({ listingId: req.params.listingId });
//       if (!result.creatorUserId || result.creatorUserId !== req.user.uid) {
//         res.status(401).json({ error: "Unauthorized" });
//         return next();
//       }
//     } catch (err) {
//       res.status(400).json({ error: err });
//       return next();
//     }
//     try {
//       await db.collection('listings').updateOne({ listingId: req.params.listingId }, updateDoc);
//       res.status(200).json("Success");
//       return next();
//     } catch (err) {
//       res.status(400).json({ error: err });
//       return next();
//     }
//   });
// });

module.exports = router;
