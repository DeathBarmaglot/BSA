const { Router } = require('express');
const DetailService = require('../services/detailService');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

// OPTIONAL TODO: Implement route controller for fights

router.get('/', DetailService.get, responseMiddleware);

router.get('/:id', DetailService.getId, responseMiddleware);

router.delete("/:id", DetailService.delete, responseMiddleware);

router.post('/', DetailService.post, responseMiddleware);

router.put("/:id", DetailService.put, responseMiddleware);


module.exports = router;