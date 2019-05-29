const { MySQL } = require('../../db');
const Users = require('./users.model');
const { hashPayload, jwt } = require('../../utils');

async function createNewUser({
  email, password, firstName, lastName,
}) {
  const res = await Users.find({ email: email });

  if (res[0]) {
    const msg = 'Email already exits.';
    const err = new Error(msg);
    err.code = 409;
    err.msg = msg;
    throw err;
  }

  const hashedPassword = await hashPayload(password);
  const user = new Users({ email, firstName, lastName, password: hashedPassword });
  const newUser = await user.save();

  return {
    user: { ...newUser._doc }
  };
}

async function loginUser({ email, password }) {
  const hashedPassword = await hashPayload(password);
  const res = await Users.find({ email: email, password: hashedPassword });

  if (!res[0]) {
    const msg = 'Invalid email or password.';
    const err = new Error(msg);
    err.code = 404;
    err.msg = msg;
    throw err;
  }

  const accessToken = jwt.createAccessToken({
    id: res[0]._id,
    email: res[0].email,
    firstName: res[0].firstName,
    lastName: res[0].lastName,
    tokenType: 'LoginToken',
  });

  delete res[0].password;

  return {
    user: res[0],
    token: accessToken,
  };
}

async function changeUserPassword({ userId, oldPassword, newPassword }) {
  const res = await MySQL.sequelize.query('SELECT * FROM users WHERE id = ?', {
    type: MySQL.sequelize.QueryTypes.SELECT,
    replacements: [userId],
  });

  // console.log('---res ---', res);

  if (!res[0]) {
    const msg = 'User not found in records';
    const err = new Error(msg);
    err.code = 404;
    err.msg = msg;
    throw err;
  }

  if (res[0].is_active || res[0].is_blocked || res[0].is_deleted) {
    const msg = 'User is not allowed to perform any action. Account is susspended';
    const err = new Error(msg);
    err.code = 403;
    err.msg = msg;
    throw err;
  }

  const oldHashedPassword = await hashPayload(oldPassword);

  if (res[0].password !== oldHashedPassword) {
    const msg = 'Incorrect credential, Not allowed';
    const err = new Error(msg);
    err.code = 401;
    err.msg = msg;
    throw err;
  }

  const newHashedPassword = await hashPayload(newPassword);
  await MySQL.sequelize.query('UPDATE users SET password = ? WHERE id = ?', {
    type: MySQL.sequelize.QueryTypes.UPDATE,
    replacements: [newHashedPassword, userId],
  });
  return {};
}

async function changeUserEmail({
  userId, oldEmail, newEmail, password,
}) {
  const res = await MySQL.sequelize.query('SELECT * FROM users WHERE id = ?', {
    type: MySQL.sequelize.QueryTypes.SELECT,
    replacements: [userId],
  });

  if (!res[0]) {
    const msg = 'User not found in records';
    const err = new Error(msg);
    err.code = 404;
    err.msg = msg;
    throw err;
  }

  if (res[0].email !== oldEmail) {
    const msg = 'Invalid userId and userEmail combination';
    const err = new Error(msg);
    err.code = 401;
    err.msg = msg;
    throw err;
  }

  if (res[0].is_active || res[0].is_blocked || res[0].is_deleted) {
    const msg = 'User is not allowed to perform any action. Account is susspended';
    const err = new Error(msg);
    err.code = 403;
    err.msg = msg;
    throw err;
  }

  const hashedPassword = await hashPayload(password);

  if (res[0].password !== hashedPassword) {
    const msg = 'Incorrect credential, Not allowed';
    const err = new Error(msg);
    err.code = 401;
    err.msg = msg;
    throw err;
  }

  await MySQL.sequelize.query('UPDATE users SET email = ? WHERE id = ?', {
    type: MySQL.sequelize.QueryTypes.UPDATE,
    replacements: [newEmail, userId],
  });
  return {};
}

module.exports = {
  createNewUser,
  loginUser,
  changeUserPassword,
  changeUserEmail,
};
