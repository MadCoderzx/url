const { isValidUrl } = require('../utils/validateUrl');
const { generateShortCode } = require('../utils/shortCode');
const {
  createUrlEntry,
  findUrlsByClientId,
  deleteUrlByIdAndClient,
  shortCodeExists,
} = require('../services/urlService');

async function createUrl(req, res, next) {
  try {
    const { originalUrl, clientId } = req.body;

    if (!clientId || typeof clientId !== 'string' || !clientId.trim()) {
      return res.status(400).json({ error: 'clientId is required' });
    }

    if (!originalUrl || typeof originalUrl !== 'string' || !isValidUrl(originalUrl)) {
      return res.status(400).json({ error: 'originalUrl must be a valid URL' });
    }

    let shortCode;
    let attempts = 0;
    do {
      shortCode = generateShortCode();
      attempts += 1;
      if (attempts > 5) {
        return res.status(500).json({ error: 'Unable to generate a unique short code' });
      }
    } while (await shortCodeExists(shortCode));

    const url = await createUrlEntry({ clientId: clientId.trim(), originalUrl: originalUrl.trim(), shortCode });
    return res.status(201).json(url);
  } catch (error) {
    next(error);
  }
}

async function getUrls(req, res, next) {
  try {
    const clientId = req.query.clientId;
    if (!clientId || typeof clientId !== 'string' || !clientId.trim()) {
      return res.status(400).json({ error: 'clientId query parameter is required' });
    }

    const urls = await findUrlsByClientId(clientId.trim());
    return res.json({ urls });
  } catch (error) {
    next(error);
  }
}

async function deleteUrl(req, res, next) {
  try {
    const id = Number(req.params.id);
    const clientId = req.query.clientId || req.body.clientId || req.header('x-client-id');

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: 'Invalid URL id' });
    }

    if (!clientId || typeof clientId !== 'string' || !clientId.trim()) {
      return res.status(400).json({ error: 'clientId is required to delete the URL' });
    }

    const deleted = await deleteUrlByIdAndClient(id, clientId.trim());
    if (!deleted) {
      return res.status(404).json({ error: 'URL not found or not owned by this client' });
    }

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createUrl,
  getUrls,
  deleteUrl,
};
