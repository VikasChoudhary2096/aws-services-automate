const express = require('express');

const router = express.Router();

const snsController = require('../controllers/sns');

router.get('/', snsController.fetch);

router.get('/all', snsController.fetchAll);

router.post('/', snsController.create);

router.put('/', snsController.update);

router.get('/execute', snsController.execute);

module.exports = router;