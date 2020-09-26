const express = require('express');
const router = express.Router();

const Article = require('../models/articleModel');

router.get('/', (req, res) => {
  if (req.query.search) {
    Article.find({ "title": {$regex: `.*${req.query.search}.*` }}, (err, articles) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json(articles);
      }
    })
  } else {
    Article.find({}, (err, articles) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json(articles);
      }
    })
  }
});

router.put('/:id', (req, res) => {
  Article.updateOne({ id: req.body.id},
    {$set:
      { title: req.body.title,
        body: req.body.body,
      }
    }, (err, article) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (article) {
        res.status(200).json(article);
      } else {
        res.status(404).json('Article not registered');
      }
    }
  })
})

module.exports = router;