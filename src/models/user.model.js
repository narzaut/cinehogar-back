const validator = require('validator');
const { INTEGER, STRING, ENUM } = require('sequelize');
const { connection } = require('../config/database-init');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const bcrypt = require('bcryptjs')
const { roles } = require('../config/roles');

const userSchema = ( sequelize ) => {
	console.log(roles, 'roles')
	const User = sequelize.define('user', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: INTEGER
		},
		name: {
			allowNull: false,
			type: STRING
		},
		email: {
			type: STRING,
			allowNull: false,
			validate(value) {
        if (!validator.isEmail(value)) {
          throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid email');
        }
      },
		},
		password: {
			allowNull: false,
			type: STRING
		},
		role: {
			type: ENUM(roles)
		}
	});
	
	User.isEmailTaken = async (userEmail) => {
		const found = await User.findAll({
			where: {
				email: userEmail
			}
		})
		if (found.length) return true
		return false
	}

	User.isPasswordMatch = async (userEmail, userPassword) => {
		const user = await User.findOne({
			where: {
				email: userEmail
			},
			attributes: ['password']
		})
		return bcrypt.compare(userPassword, user.password)
	}

	return User
};



const User = userSchema(connection)

module.exports = User