const express = require('express');
const router = express.Router();

const Article = require('../models/articleModel');
const User = require('../models/userModel');

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


router.post('/random', (req, res) => {
  let errors = "";
  let articlesData = [];

  req.body.map(user => {
    const newUserData = Object.assign({ 
      name: user.name,
      email: user.email,
      image_url: user.image_url,
      address: {
        city: user.address.city,
        street: user.address.street
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
    articlesData.push(newArticle);
    newArticle.save().catch(err => errors = err.message)
  })

  if (errors) {
    res.status(500).send(errors);
  } else {
    res.status(200).send(articlesData)
  }
})

router.delete('/all', (req, res) => {
  User.deleteMany({}, (err, result) => {
    if (err) {
      res.status(500).send('Collection not deleted');
    } else {
      Article.deleteMany({}, (err, result) => {
        if (err) {
          res.status(500).send('Collection not deleted');
        } else {
          res.status(200).json(result);
        }
      })
    }
  })
})

module.exports = router;