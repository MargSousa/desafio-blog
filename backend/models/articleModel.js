const mongoose = require('mongoose');
const { Schema } = mongoose;

const ArticleSchema = new Schema({
  id: mongoose.Schema.Types.ObjectId,
  title: String,
  body: String,
})

const Article = mongoose.model('article', ArticleSchema)

module.exports = Article;
