const mongoose = require('mongoose');

const pickupSchema = new mongoose.Schema({
  name: String,
  address: String,
  pickupDate:String,
  instructions:String,
});

const PickUp = mongoose.model('PickUp', pickupSchema);

module.exports = PickUp;