const mongoose = require('mongoose');
const validator = require('validator')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "name is require"],
    minlength: [8, 'Name should at least 8 character'],
    maxlength:[16,'Name should be max 16 character']
  },
  email: {
    type: String,
    require: true,
    // custom validate function
    //using validattor.js 
    validate(value) {
      const error = new Error();
      if (!validator.isEmail(value)) {
        error.message('Email invalid format');
        error.statusCode = 422;
        throw error;
      }
    }
  },
  password: {
    type: String,
    require:true
  },
  avatar: {
    type: String
  }
})

const User = mongoose.model('User', UserSchema,'User');

module.exports = {
  UserSchema, User
};