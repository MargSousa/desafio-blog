const express = require('express');
const router = express.Router();

const User = require('../models/userModel');

router.get('/', (req, res) => {
  User.find((err, users) => {
    if (err) {
      res.status(500).send('Users not found');
    } else {
      res.status(200).json(users);
    }
  })
})

router.get('/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if(user) {
        res.status(200).json(user);
      } else {
        res.status(404).json('User not registered in db');
      }
    }
  })
})

module.exports = router;
