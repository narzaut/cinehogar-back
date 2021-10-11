const express = require('express');
const authController = require('../../controllers/auth.controller');
const authValidation = require('../../validations/auth.validation');
const validate = require('../../middlewares/validate');


const router = express.Router();

router.route('/login')
	.post(validate(authValidation.login), authController.login)

module.exports = router;