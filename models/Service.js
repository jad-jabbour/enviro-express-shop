const mongoose = require('mongoose');
const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tag: String,
  price: String,
  description: String
}, { timestamps: true });
module.exports = mongoose.model('Service', serviceSchema);
