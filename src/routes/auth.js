const express = require('express');
const router = express.Router();

const authFunctions = require('../auth/functions');
const passport = require('../auth/local');

router.post('/register', (req, res, next)  => {
  return authFunctions.createUser(req, res)
  .then((response) => {
    passport.authenticate('local', (err, user, info) => {
      if (user) { handleResponse(res, 200, 'success'); }
    })(req, res, next);
  })
  .catch((err) => { handleResponse(res, 500, 'error'); });
});


router.post('/login', authFunctions.loginRedirect, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { handleResponse(res, 500, 'error'); }
    if (!user) { handleResponse(res, 404, 'User not found'); }
    if (user) {
      req.logIn(user, function (err) {
        if (err) { handleResponse(res, 500, 'error'); }
        handleResponse(res, 200, 'success');
      });
    }
  })(req, res, next);
});


router.get('/logout', authFunctions.loginRequired, (req, res, next) => {
  req.logout();
  handleResponse(res, 200, 'success');
});


function handleResponse(res, code, statusMsg) {
  res.status(code).json({status: statusMsg});
}

module.exports = router;
