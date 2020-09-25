const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  email: String,
  image_url: String,
  address: {
    street: String,
    city: String,
  },
  articles: [{
    type: Number,
    ref: "Article"
  }]
})

const User = mongoose.model('user', UserSchema)

module.exports = User;