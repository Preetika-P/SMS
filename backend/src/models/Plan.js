const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quota: { type: Number, required: true }, // e.g., data in GB
  description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Plan', planSchema);
