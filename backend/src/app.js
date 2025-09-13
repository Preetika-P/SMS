const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// routes
const authRoutes = require('./routes/auth.routes');
const usersRoutes = require('./routes/users.routes');
const subscriptionsRoutes = require('./routes/subscriptions.routes');
const plansRoutes = require('./routes/plans.routes');

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// health check
app.get('/health', (_req, res) => res.json({ ok: true, ts: Date.now() }));

// mount routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/subscriptions', subscriptionsRoutes);
app.use('/api/v1/plans', plansRoutes);

// 404
app.use((req, res, next) => {
  if (res.headersSent) return next();
  res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Route not found' } });
});

// error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    error: {
      code: err.code || 'INTERNAL',
      message: err.message || 'Unexpected error',
      details: err.details || null
    }
  });
});

module.exports = app;
