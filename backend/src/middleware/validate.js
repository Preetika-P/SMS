const validate = (schema, where = 'body') => (req, res, next) => {
  try {
    const parsed = schema.parse(req[where]);
    req[where] = parsed;
    next();
  } catch (err) {
    return res.status(400).json({
      error: { code: 'BAD_REQUEST', message: 'Validation failed', details: err.errors || String(err) }
    });
  }
};

module.exports = { validate };
