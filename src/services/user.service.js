const User = require('../models/user.model');

const getAllUsers = async () => {
  const users = await User.findAll();
  return users;
};

const createUser = async (userBody) => {

  return User.create(userBody);
};


module.exports = {
  getAllUsers,
	createUser
};
