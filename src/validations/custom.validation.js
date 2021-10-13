const objectId = (value, helpers) => {
  if (!value.match(/^\d*[1-9]\d*$/)) {
    return helpers.message('user id must be a valid mysql id');
  }
  return value;
};

const password = (value, helpers) => {
  if (!value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)) {
    return helpers.message(`password must contain ['lowercase', 'uppercase', 'number'] and has to be at least 8 digits long.`);
  }
  return value;
};

module.exports = {
  objectId,
  password,
};
