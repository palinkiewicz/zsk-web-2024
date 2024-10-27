const express = require('express');
const path = require('node:path');
const fs = require('fs');
const axios = require('axios');
const router = express.Router();

function sendView(viewFile, res) {
  const layout = fs.readFileSync(path.join(__dirname, '../public/layout.html'), 'utf-8');
  const content = fs.readFileSync(path.join(__dirname, '../public/views/' + viewFile), 'utf-8');

  const page = layout.replace('<!--CONTENT-->', content);

  res.send(page);
}

router.get('/', function(req, res, next) {
  sendView('home.html', res);
});

router.get('/o-nas', function(req, res, next) {
  sendView('about.html', res);
});

router.get('/oferta', function(req, res, next) {
  sendView('offer.html', res);
});

router.get('/kontakt', function(req, res, next) {
  sendView('contact.html', res);
});

router.post('/kontakt', async function(req, res, next) {
  console.log(req.body);

  try {
    await axios.post('http://localhost:3000/api/contact-messages', req.body, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error:', error);
  }

  res.redirect('/');
});

router.get('/*', function(req, res, next) {
  res.send('<h1>404 Not Found</h1>');
})

module.exports = router;
