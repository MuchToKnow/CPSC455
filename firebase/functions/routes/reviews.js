const express = require('express');
const router = express.Router();
const { v4: uuid } = require('uuid');
const db = require('../db');
const authMiddleware = require('../middleware/auth');

/* GET all reviews associated with user. */
router.get('/mine', authMiddleware, (req, res, next) => {
  db.getInstance(async (db) => {
    try {
      const result = await db.collection('reviews').find({ creatorUserId: req.user.uid }).toArray();
      res.status(200).json(result);
      return next();
    } catch (err) {
      res.status(400).json({ error: err });
      return next();
    }
  });
});

/* GET all reviews associated with listing. */
router.get('/byListing/:listingId', (req, res, next) => {
  db.getInstance(async (db) => {
    try {
      const result = await db.collection('reviews').find({ listingId: req.params.listingId }).toArray();
      res.status(200).json(result);
      return next();
    } catch (err) {
      res.status(400).json({ error: err });
      return next();
    }
  });
});

/* GET single review */
router.get('/:reviewId', authMiddleware, (req, res, next) => {
  db.getInstance(async (db) => {
    try {
      const result = await db.collection('reviews').findOne({ reviewId: req.params.reviewId });
      res.status(200).json(result);
      return next();
    } catch (err) {
      res.status(400).json({ error: err });
      return next();
    }
  });
});

/* POST create single review. */
router.post('/', authMiddleware, (req, res, next) => {
  const { listingId, rating, comment } = req.body;
  if (!listingId || !rating || !comment) {
    return res.status(400).json({ error: "Missing a param. Required params: listingId, rating, comment" });
  }
  const reviewObj = {
    creatorUserId: req.user.uid,
    email: req.user.email,
    reviewId: uuid(),
    ...req.body
  };
  db.getInstance(async (db) => {
    try {
      await db.collection('reviews').insertOne(reviewObj);
      res.status(201).json("Success");
      return next();
    } catch (err) {
      res.status(400).json({ error: err });
      return next();
    }
  });
});

/* DELETE delete single review */
router.delete('/:reviewId', authMiddleware, (req, res, next) => {
  if (!req.user || !req.user.uid) {
    res.status(401).json({ error: "Unauthorized, no user id available" });
    return next();
  }
  db.getInstance(async (db) => {
    try {
      const result = await db.collection('reviews').findOne({ reviewId: req.params.reviewId });
      if (!result.creatorUserId || result.creatorUserId !== req.user.uid) {
        res.status(401).json({ error: "Unauthorized" });
        return next();
      }
    } catch (err) {
      res.status(400).json({ error: err });
      return next();
    }

    try {
      await db.collection('reviews').deleteOne({ reviewId: req.params.reviewId });
      res.status(200).json("Success");
      return next();
    } catch (err) {
      res.status(400).json({ error: err });
      return next();
    }
  });
});

module.exports = router;
