const bcrypt = require('bcryptjs');
const knex = require('../db/connection');

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

function createUser(req, res) {
  return handleErrors(req)
  .then(() => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(req.body.password, salt);
    return knex('users')
    .insert({
      username: req.body.username,
      name:     req.body.name,
      surname:  req.body.surname,
      password: hash
    })
    .returning('*');
  })
  .catch((err) => {
    res.status(400).json({status: err.message});
  });
}

function loginRedirect(req, res, next) {
  if (req.user) return res.status(401).json(
    {status: 'You are already logged in'});
  return next();
}

function loginRequired(req, res, next) {
  if (!req.user) return res.status(401).json({status: 'Please log in'});
  return next();
}



function handleErrors(req) {
  return new Promise((resolve, reject) => {
    if (req.body.username.length < 6) {
      reject({
        message: 'Username must be longer than 6 characters'
      });
    }
    else if (req.body.password.length < 6) {
      reject({
        message: 'Password must be longer than 6 characters'
      });
    } else if (req.body.name.length <= 0) {
      reject({
        message: 'Name must provided'
      });
    } else if (req.body.surname.length <= 0) {
      reject({
        message: 'Surname must provided'
      });
    } else {
      resolve();
    }
  });
}

module.exports = {
  comparePass,
  createUser,
  loginRedirect,
  loginRequired
};
