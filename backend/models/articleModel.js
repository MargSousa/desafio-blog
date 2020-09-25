const mongoose = require('mongoose');
const { Schema } = mongoose;

const ArticleSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  title: String,
  body: String,
})

const Article = mongoose.model('article', ArticleSchema)

module.exports = Article;
