const express = require('express');
const { addPost } = require('../controllers/social');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Works');
});

router.post('/', addPost);

module.exports = router;
