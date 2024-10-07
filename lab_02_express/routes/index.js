const express = require('express');
const path = require('path');
const fs = require('fs');
const mime = require('mime-types');
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

router.get('/:fileUrl', function(req, res, next) {
  try {
    const filename = path.resolve(__dirname + '/../assets/' + req.params.fileUrl);
    const file = fs.readFileSync(filename, 'utf8');

    res.set('Content-Type', mime.lookup(filename.split('/').at(-1)) ?? 'text/plain');
    res.send(file);
  } catch (e) {
    res.status(404);
    res.set('Content-Type', 'application/json');
    res.json({"status": "404", "message": "Not found"});
  }
});

module.exports = router;
