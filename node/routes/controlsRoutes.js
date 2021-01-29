const { Router } = require('express');
const controlsService = require('../services/controlsService');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

router.get('/', controlsService.get, responseMiddleware);

router.post('/', controlsService.post, responseMiddleware);

module.exports = router;
