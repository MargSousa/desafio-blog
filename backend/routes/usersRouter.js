const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Article = require('../models/articleModel');
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

router.post('/', (req, res) => {
  let errors = "";
  req.body.map(user => {
    const newUserData = Object.assign({ 
      name: user.name,
      email: user.email,
      image_url: user.image_url,
      address: {
        city: user.city,
        street: user.street
      },
      articles: [(user.article.id)]
    });

    const newUser = new User(newUserData);
    newUser.save().catch(err => errors = err.messages)

    const newArticleData = Object.assign({ 
      id: user.article.id,
      title: user.article.title,
      body: user.article.body,
    });

    const newArticle = new Article(newArticleData);
    newArticle.save().catch(err => errors = err.message)
  })

  if (errors) {
    res.status(500).send(errors);
  } else {
    res.status(200).send("Collection added")
  }
})

router.delete('/', (req, res) => {
  User.deleteMany({}, (err, result) => {
    if (err) {
      res.status(500).send('Collection not deleted');
    } else {
      res.status(200).json(result);
    }
  })
})

module.exports = router;
