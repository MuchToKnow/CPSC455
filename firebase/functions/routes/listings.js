const express = require('express');
const router = express.Router();
const { v4: uuid } = require('uuid');
const db = require('../db');

/* GET all listings */
router.get('/', (req, res, next) => {
  //TODO: Implement listing
  return res.status(400).json({ error: "Not implemented" });
});

/* GET all listings associated with user. */
router.get('/mine', (req, res, next) => {
  //TODO: Implement listing
  return res.status(400).json({ error: "Not implemented" });
});

/* GET single listing. */
router.get('/:listingId', (req, res, next) => {
  //TODO: Implement listing get
  return res.status(400).json({ error: "Not implemented" });
});

/* GET search for listing. */
router.get('/search/:searchTerm', (req, res, next) => {
  //TODO: Implement listing search
  return res.status(400).json({ error: "Not implemented" });
});

/* POST create single listing. */
router.post('/', (req, res, next) => {
  const { imgUrl, size, location, numberAvail, dayPrice } = req.body;
  let listingObj;
  if (req.user) {
    listingObj = {
      userId: req.user.uid,
      email: req.user.email,
      listingId: uuid(),
      imgUrl,
      size,
      location,
      numberAvail,
      dayPrice,
    };
  } else {
    listingObj = {
      listingId: uuid(),
      imgUrl,
      size,
      location,
      numberAvail,
      dayPrice,
    };
  }
  db.getInstance((db) => {
    console.log(db);
    db.db('test').collection('listings').insertOne(listingObj, (err, result) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      return res.status(201);
    });
  });
});

/* DELETE delete single listing */
router.delete('/:listingId', (req, res, next) => {
  //TODO: Implement listing delete
  return res.status(400).json({ error: "Not implemented" });
});

/* PUT update single listing */
router.put('/:listingId', (req, res, next) => {
  //TODO: Implement listing update
  return res.status(400).json({ error: "Not implemented" });
});

module.exports = router;
