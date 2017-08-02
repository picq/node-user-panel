const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

  const renderObject = {};

  renderObject.title = 'Hello to test user panel!';

  res.render('index', renderObject);
});

module.exports = router;
