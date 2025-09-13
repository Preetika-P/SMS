const router = require('express').Router();
const {
  subscribe,
  cancelSubscription,
  getUserSubscriptions
} = require('../controllers/subscriptions.controller');

router.post('/', subscribe);
router.post('/:id/cancel', cancelSubscription);
router.get('/user/:userId', getUserSubscriptions);

module.exports = router;
