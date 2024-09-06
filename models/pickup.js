const mongoose = require('mongoose');

const pickupSchema = new mongoose.Schema({
  name: String,
  address: String,
  pickupDate:String,
  runner:String,
  instructions:String,
  runner:String
});

const PickUp = mongoose.model('PickUp', pickupSchema);

module.exports = PickUp;
