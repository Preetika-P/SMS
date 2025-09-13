const Subscription = require('../models/Subscription');

exports.subscribe = async (req, res, next) => {
  try {
    const { userId, planId } = req.body;
    const sub = await Subscription.create({ userId, planId });
    res.json(sub);
  } catch (err) { next(err); }
};

exports.cancelSubscription = async (req, res, next) => {
  try {
    const sub = await Subscription.findByIdAndUpdate(req.params.id, { status: 'cancelled' }, { new: true });
    res.json(sub);
  } catch (err) { next(err); }
};

exports.getUserSubscriptions = async (req, res, next) => {
  try {
    const subs = await Subscription.find({ userId: req.params.userId }).populate('planId');
    res.json(subs);
  } catch (err) { next(err); }
};
