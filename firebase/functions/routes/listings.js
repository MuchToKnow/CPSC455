const express = require('express');
const FuzzySearch = require('fuzzy-search');
const router = express.Router();
const { v4: uuid } = require('uuid');
const db = require('../db');
const authMiddleware = require('../middleware/auth');

/* GET search for listings associated with user. */
router.get('/mine/search', authMiddleware, (req, res, next) => {
  const searchTerm = req.query['searchTerm'];
  if (!searchTerm) {
    res.status(400).json({ error: "No search string specified" });
    return next();
  }
  db.getInstance(async (db) => {
    try {
      const filteredListings = await db.collection('listings').find({ creatorUserId: req.user.uid }).toArray();
      const searcher = new FuzzySearch(filteredListings, ['size', 'location'], {
        caseSensitive: false,
        sort: true,
      });
      const result = searcher.search(searchTerm);
      res.status(200).json(result);
      return next();
    } catch (err) {
      res.status(400).json({ error: err });
      return next();
    }
  });
});

/* GET all listings associated with user. */
router.get('/mine', authMiddleware, (req, res, next) => {
  db.getInstance(async (db) => {
    try {
      const result = await db.collection('listings').find({ creatorUserId: req.user.uid }).toArray();
      res.status(200).json(result);
      return next();
    } catch (err) {
      res.status(400).json({ error: err });
      return next();
    }
  });
});

/* GET search for listing. */
router.get('/search', (req, res, next) => {
  const searchTerm = req.query['searchTerm'];
  if (!searchTerm) {
    res.status(400).json({ error: "No search string specified" });
    return next();
  }
  db.getInstance(async (db) => {
    try {
      const allListings = await db.collection('listings').find().toArray();
      const searcher = new FuzzySearch(allListings, ['size', 'location'], {
        caseSensitive: false,
        sort: true,
      });
      const result = searcher.search(searchTerm);
      res.status(200).json(result);
      return next();
    } catch (err) {
      res.status(400).json({ error: err });
      return next();
    }
  });
});

/* GET single listing. */
router.get('/single/:listingId', (req, res, next) => {
  db.getInstance(async (db) => {
    try {
      const result = await db.collection('listings').findOne({ listingId: req.params.listingId });
      res.status(200).json(result);
      return next();
    } catch (err) {
      res.status(400).json({ error: err });
      return next();
    }
  });
});

/* GET all listings */
router.get('/', (req, res, next) => {
  db.getInstance(async (db) => {
    try {
      const result = await db.collection('listings').find().toArray();
      res.status(200).json(result);
      return next();
    } catch (err) {
      res.status(400).json({ error: err });
      return next();
    }
  });
});

/* POST create single listing. */
router.post('/', authMiddleware, (req, res, next) => {
  const { imgUrl, size, location, numberAvail, dayPrice } = req.body;
  const listingObj = {
    creatorUserId: req.user.uid,
    email: req.user.email,
    listingId: uuid(),
    imgUrl,
    size,
    location,
    numberAvail,
    dayPrice,
    reviews: [],
  };
  db.getInstance(async (db) => {
    try {
      const result = await db.collection('listings').insertOne(listingObj);
      res.status(201).json("Success");
      return next();
    } catch (err) {
      res.status(400).json({ error: err });
      return next();
    }
  });
});

/* DELETE delete single listing */
router.delete('/:listingId', authMiddleware, (req, res, next) => {
  if (!req.user || !req.user.uid) {
    res.status(401).json({ error: "Unauthorized, no user id available" });
    return next();
  }
  db.getInstance(async (db) => {
    try {
      const result = await db.collection('listings').findOne({ listingId: req.params.listingId });
      if (!result.creatorUserId || result.creatorUserId !== req.user.uid) {
        res.status(401).json({ error: "Unauthorized" });
        return next();
      }
    } catch (err) {
      res.status(400).json({ error: err });
      return next();
    }

    try {
      await db.collection('listings').deleteOne({ listingId: req.params.listingId });
      res.status(200).json("Success");
      return next();
    } catch (err) {
      res.status(400).json({ error: err });
      return next();
    }
  });
});

/* PUT update single listing */
router.put('/:listingId', authMiddleware, (req, res, next) => {
  if (!req.user || !req.user.uid) {
    res.status(401).json({ error: "Unauthorized, no user id available" });
    return next();
  }
  // Not the most secure, but only the owner of the document can call these so it's not an issue.
  const updateDoc = {
    $set: req.body
  };
  db.getInstance(async (db) => {
    try {
      const result = await db.collection('listings').findOne({ listingId: req.params.listingId });
      if (!result.creatorUserId || result.creatorUserId !== req.user.uid) {
        res.status(401).json({ error: "Unauthorized" });
        return next();
      }
    } catch (err) {
      res.status(400).json({ error: err });
      return next();
    }
    try {
      await db.collection('listings').updateOne({ listingId: req.params.listingId }, updateDoc);
      res.status(200).json("Success");
      return next();
    } catch (err) {
      res.status(400).json({ error: err });
      return next();
    }
  });
});

module.exports = router;
