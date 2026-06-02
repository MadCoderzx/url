const router = require('express').Router();
const urlController = require('../controllers/urlController');

router.post('/', urlController.createUrl);
router.get('/', urlController.getUrls);
router.delete('/:id', urlController.deleteUrl);

module.exports = router;
