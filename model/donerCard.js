const mongoose = require('mongoose');

let donerScheme = new mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    contact: Number,
    address: String,
    blood_group: String,
    gender: String
})

module.exports = mongoose.model('donerDetails', donerScheme);