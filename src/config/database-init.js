const config = require('./config')
const Sequelize = require('sequelize');

const connection = new Sequelize(
	config.database.name, config.database.user,
	config.database.password,
	{
		host: config.database.host,
		dialect: 'mysql'
	}
);

connection.sync({ force:false })
	.then(() => {
		console.log('\nSuccessfully synced tables')
	})

module.exports = {
	connection
}