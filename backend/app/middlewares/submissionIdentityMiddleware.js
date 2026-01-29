const { verifyToken } = require('../core/security/jwt');
const config = require('../core/config');
const mongoose = require('mongoose');

function getClientIp(req) {
  const forwarded = req.headers && req.headers['x-forwarded-for'];
  if (forwarded) {
    const first = typeof forwarded === 'string' ? forwarded.split(',')[0] : forwarded[0];
    return (first && first.trim()) || req.ip || req.socket?.remoteAddress || '';
  }
  return req.headers && req.headers['x-real-ip']
    ? req.headers['x-real-ip']
    : (req.ip || req.socket?.remoteAddress || '');
}

/**
 * Build anonymousId as raw string "ip|userAgent|acceptLanguage" so it can be parsed for analysis (IP, device, etc.).
 */
function deriveAnonymousIdFromRequest(req) {
  const ip = getClientIp(req);
  const userAgent = (req.headers && req.headers['user-agent']) || '';
  const acceptLanguage = (req.headers && req.headers['accept-language']) || '';
  return [ip, userAgent, acceptLanguage].join('|');
}

/**
 * If frontend sent auth token (cookie), attach req.user; never fails.
 */
function optionalAuth(req, res, next) {
  try {
    const token = req.cookies?.[config.cookie.name];
    if (!token) return next();
    const decoded = verifyToken(token);
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
    };
  } catch (_) {
    // ignore invalid/expired token
  }
  next();
}

/**
 * Sets req.submissionIdentity = { anonymousId, userId? }.
 * anonymousId is always derived from the request. userId is set only if auth token was sent (user authenticated).
 */
function submissionIdentity(req, res, next) {
  const anonymousId = deriveAnonymousIdFromRequest(req);
  const userId = req.user?.userId ? new mongoose.Types.ObjectId(req.user.userId) : undefined;
  req.submissionIdentity = { anonymousId, userId };
  next();
}

module.exports = {
  optionalAuth,
  submissionIdentity,
};
