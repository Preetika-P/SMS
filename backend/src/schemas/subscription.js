const { z } = require('zod');

const subscribeSchema = z.object({
  planId: z.string().min(1)
});

const modifySchema = z.object({
  action: z.enum(['upgrade', 'downgrade', 'cancel', 'renew']),
  planId: z.string().min(1).optional()
});

module.exports = { subscribeSchema, modifySchema };

