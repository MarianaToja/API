const { Router } = require("express");
const contaController = require ("../controllers/contasController");
const {validateConta} = require("../middlewares/ValidateConta").default
const router = Router();

// Rotas para a entidade Conta
router.post('/', validateConta, contaController.create);

router.put('/:id', validateConta, contaController.update);

router.delete('/:id', contaController.delete);

router.get('/:id', contaController.getOne);

router.get('/', contaController.getAll);

module.exports = router;
