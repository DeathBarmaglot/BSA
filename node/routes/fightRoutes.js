const { Router } = require('express');
const FightService = require('../services/fightService');
const { createFightValid, updateFightValid } = require('../middlewares/fight.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

// OPTIONAL TODO: Implement route controller for fights

router.get('/', FightService.get, responseMiddleware);

router.get('/:id', FightService.getId, responseMiddleware);

router.delete("/:id", FightService.delete, responseMiddleware);

router.post('/', createFightValid, FightService.post, responseMiddleware);

router.put("/:id", updateFightValid, FightService.put, responseMiddleware);


module.exports = router;