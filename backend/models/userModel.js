const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  email: String,
  image_url: String,
  address_street: String,
  address_city: String,
  articles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Article"
  }]
})

const User = mongoose.model('user', UserSchema)

module.exports = User;