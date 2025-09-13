const Plan = require('../models/Plan');

exports.createPlan = async (req, res, next) => {
  try {
    const plan = await Plan.create(req.body);
    res.json(plan);
  } catch (err) { next(err); }
};

exports.getPlans = async (req, res, next) => {
  try {
    const plans = await Plan.find();
    res.json(plans);
  } catch (err) { next(err); }
};
