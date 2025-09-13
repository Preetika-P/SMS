const mongoose = require('mongoose');

const monthlyUsageSchema = new mongoose.Schema({
  subscriptionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription', index: true, required: true },
  month: { type: String, required: true }, // format YYYY-MM
  usageGB: { type: Number, required: true }
}, { timestamps: true });

monthlyUsageSchema.index({ subscriptionId: 1, month: 1 }, { unique: true });

module.exports = mongoose.model('MonthlyUsage', monthlyUsageSchema);
