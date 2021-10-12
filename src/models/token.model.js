const validator = require('validator');
const {
	INTEGER,
	STRING,
	ENUM,
	DATE,
	BOOLEAN
} = require('sequelize');
const {
	connection
} = require('../config/database-init');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const tokenTypes = require('../config/tokens');

const tokenSchema = (sequelize) => {
	const Token = sequelize.define('token', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: INTEGER
		},
		token: {
			type: STRING,
			allowNull: false
		},
		user: {
			type: INTEGER,
			allowNull: false
		},
		expires: {
			type: DATE,
			allowNull: false
		},
		type: {
			type: ENUM([tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD, tokenTypes.VERIFY_EMAIL]),
			allowNull: false
		},
		blacklisted: {
			type: BOOLEAN,
			default: false
		}
	});

	return Token
};



const Token = tokenSchema(connection)

module.exports = Token