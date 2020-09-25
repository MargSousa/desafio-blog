const axios = require('axios');
const mongoose = require('mongoose');
const express = require('express');

const User = require('../models/userModel');
const Article = require('../models/articleModel');

const router = express.Router();

router.get('/', (req, res) => {
  Article.find({"title" : `/.*${req.query.search}.*/`}, (err, article) => {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log("ok")
      res.status(200).json(article);
    }
  })
});

router.put('/:id', (req, res) => {
  console.log("update")
  Article.findById(req.params.id, (err, article) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if(article) {
        article.title = req.body.title;
        article.body = req.body.body;

        article.save().then((err, user) =>{
          if (err) {
            console.log("err", err)
            res.status(500).send('Error, article not updated');
          } else {
            res.status(200).json(article);
          }
        })
      } else {
        res.status(404).json('Article not registered');
      }
    }
  })
})

module.exports = router;