const express = require('express');

const router = express.Router();

const lambdaController = require('../controllers/lambda');

router.get('/', lambdaController.fetch);

router.get('/all', lambdaController.fetchAll);

router.get('/execute', lambdaController.execute);

router.post('/', lambdaController.create);

router.put('/', lambdaController.update);


module.exports = router;