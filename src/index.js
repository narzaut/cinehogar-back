const app = require('./app')
const config = require('./config/config');
const { connection } = require('./config/database-init');

//Check DB connection then run server
(async () => {
	try {
		await connection.authenticate();
		console.log('\nConnection has been established successfully.\n');
		app.listen(config.port, () => {
			console.log(`Listening on ${config.port}`)
		})
	} catch (error) {
		console.error('\nUnable to connect to the database:', error);
	}
})();