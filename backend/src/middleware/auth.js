const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const h = req.headers.authorization || '';
    const token = h.startsWith('Bearer ') ? h.slice(7) : null;
    if (!token) return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'Missing token' } });
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.sub);
    if (!user) return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'User not found' } });
    req.user = { id: user._id.toString(), role: user.role, email: user.email, name: user.name };
    next();
  } catch (e) {
    e.status = 401;
    e.code = 'UNAUTHENTICATED';
    next(e);
  }
};

const requireRole = (role) => (req, res, next) => {
  if (!req.user || req.user.role !== role) {
    return res.status(403).json({ error: { code: 'FORBIDDEN', message: 'Insufficient role' } });
  }
  next();
};

module.exports = { auth, requireRole };
