const { Router } = require("express");
const adminController = require('../controllers/adminController')
const router = Router();
const {validateAdmin, validateAdminId } = require ("../middlewares/ValidateAdmin")


router.post('/', validateAdmin, adminController.create);

router.put('/:id', validateAdmin, validateAdminId, adminController.update);

router.delete('/:id', validateAdminId, adminController.delete);

router.get('/:id', adminController.getOne);

router.get('/', validateAdminId, adminController.getAll);

module.exports = router;

 