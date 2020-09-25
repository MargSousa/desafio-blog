const mongoose = require('mongoose');
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

router.put('/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if(user) {
        user.name = req.body.name;
        user.email = req.body.email;
        user.image_url = req.body.image_url;
        user.address_city = req.body.address_city;
        user.address_street = req.body.address_street;

        user.save().then((err, user) =>{
          if (err) {
            console.log("err", err)
            res.status(500).send('Error, user not updated');
          } else {
            res.status(200).json(user);
          }
        })
      } else {
        res.status(404).json('User not registered in db');
      }
    }
  })
})

router.post('/', (req, res) => {
  const newId = new mongoose.Types.ObjectId();
  // const newUserData = Object.assign(req.body);
  // const newUser = new User(newUserData);
  const newUserData = Object.assign({ _id: newId }, req.body);
  const newUser = new User(newUserData);

  newUser.save().then((err, user) => {
    console.log(user);
    if (err) {
      console.log("err", err)
      res.status(500).send('User not added');
    } else {
      res.status(200).json(user);
    }
  })
})

module.exports = router;
