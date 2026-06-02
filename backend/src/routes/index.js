const router = require('express').Router();
const healthController = require('../controllers/healthController');
const urlRoutes = require('./urls');

router.get('/health', healthController.getHealth);
router.use('/urls', urlRoutes);

module.exports = router;
