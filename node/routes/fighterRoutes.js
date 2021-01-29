const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { createFighterValid, updateFighterValid } = require('../middlewares/fighter.validation.middleware');

const router = Router();

// TODO: Implement route controllers for fighter

router.get('/', FighterService.get, responseMiddleware);

router.get('/:id', FighterService.getId, responseMiddleware);

router.delete("/:id", FighterService.delete, responseMiddleware);

router.post('/', createFighterValid, FighterService.post, responseMiddleware);

router.put("/:id", updateFighterValid, FighterService.put, responseMiddleware);

module.exports = router;