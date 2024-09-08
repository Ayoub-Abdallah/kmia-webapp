const express = require('express');
const router = express.Router();
const adminsController = require('../controllers/adminsController')

router.get('/', adminsController.renderAllAdmins );
router.get('/:id', adminsController.getAdminById );
router.post('/add-admin', adminsController.createadmin );
router.post('/edit/:id', adminsController.editadmin );
router.delete('/:id', adminsController.deleteadmin );

// Add more routes as needed

module.exports = router;
