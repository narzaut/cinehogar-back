const express = require('express');
const userController = require('../../controllers/user.controller');
const userValidation = require('../../validations/user.validation');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');


const router = express.Router();

router.route('/')
	.get(auth('getUsers'), validate(userValidation.getUsers), userController.getUsers)
	.post(validate(userValidation.createUser), userController.createUser)

router.route('/:userId')
	.get(validate(userValidation.getUser), userController.getUser)
	.delete(validate(userValidation.deleteUser), userController.deleteUser)
	.patch(validate(userValidation.updateUser), userController.updateUser)


module.exports = router;