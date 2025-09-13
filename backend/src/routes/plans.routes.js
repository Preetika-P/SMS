const router = require('express').Router();
const { createPlan, getPlans } = require('../controllers/plans.controller');

router.post('/', createPlan);
router.get('/', getPlans);

module.exports = router;
