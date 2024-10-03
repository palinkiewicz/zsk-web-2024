const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.set('Content-Type', 'text/plain');
  res.send('Strona główna');
});

router.get('/json', function(req, res, next) {
  res.json({name: 'Some JSON', description: 'Test'});
});

router.get('/html', function(req, res, next) {
  res.send('<h1>Hello World</h1><h3>Test</h3>');
});

router.get('/file', function(req, res, next) {
  res.sendFile(path.resolve(__dirname + '/../public/file.html'));
});

router.get('/get_params', function(req, res, next) {
  console.log(req.query);

  fs.writeFileSync(`params_${Date.now()}.json`, JSON.stringify(req.query));

  res.json({ok: 'ok'});
});

module.exports = router;
