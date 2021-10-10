const express = require('express');
const userController = require('../../controllers/user.controller');
const userValidation = require('../../validations/user.validation');
const validate = require('../../middlewares/validate');


const router = express.Router();

router.route('/').get(validate(userValidation.getUsers), userController.getUsers)
router.route('/').post(validate(userValidation.createUser), userController.createUser)


module.exports = router;