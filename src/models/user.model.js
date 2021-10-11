const validator = require('validator');
const { INTEGER, STRING } = require('sequelize');
const { connection } = require('./database-init');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

const userSchema = ( sequelize ) => {
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

	User.isPasswordMatch = async (userId, userPassword) => {
		const user = User.findByPk(userId)
		return bcrypt.compare(user.password, userPassword);
	}

	return User
};



const User = userSchema(connection)

module.exports = User