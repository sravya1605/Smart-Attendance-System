const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  res.json({ message: 'Upload functionality disabled (using local storage instead)' });
});

module.exports = router;