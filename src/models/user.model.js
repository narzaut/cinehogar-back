const validator = require('validator');
const { INTEGER, STRING } = require('sequelize');
const { connection } = require('./database-init')

const userSchema = ( sequelize ) => {
	return sequelize.define('user', {
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
          throw new Error('Invalid email');
        }
      },
		},
		password: {
			allowNull: false,
			type: STRING
		}
	});
};

const User = userSchema(connection)

module.exports = User