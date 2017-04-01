/**
 * @Author: Andreee Ray <develdoe>
 * @Date:   2017-04-01T04:01:13+02:00
 * @Email:  me@andreeray.se
 * @Filename: rest.js
 * @Last modified by:   develdoe
 * @Last modified time: 2017-04-01T07:57:34+02:00
 */

 // grab the things we need
 var mongoose = require('mongoose');

 // create a schema
 var userSchema = new mongoose.Schema({
   name: String,
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true },
   admin: Boolean,
   location: String,
   meta: {
     age: Number,
     website: String
   },
   created_at: Date,
   updated_at: Date
 });

 // make this available to our users in our Node applications
 module.exports = mongoose.model('User', userSchema);
