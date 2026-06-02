const { findUrlByShortCode, trackUrlRedirect } = require('../services/urlService');

function getClientIp(req) {
  const forwarded = req.header('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.ip || req.connection.remoteAddress || null;
}

async function redirectShortUrl(req, res, next) {
  try {
    const shortCode = req.params.shortCode;
    const url = await findUrlByShortCode(shortCode);
    if (!url) {
      return res.status(404).send('Short URL not found');
    }

    await trackUrlRedirect(url.id, req.header('user-agent') || null, getClientIp(req));
    return res.redirect(url.original_url);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  redirectShortUrl,
};
