const http = require('http'),
      fs = require('fs');

http.createServer(function (req, res) {
    res.statusCode = 200;

    if (req.url === '/route1') {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.write('Strona główna');
    }
    else if (req.url === '/route2') {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.write(JSON.stringify({name: 'Adam', age: 18}));
    }
    else if (req.url === '/route3') {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.write('<h1>Hello World</h1><p>Lorem ipsum</p>');
    }
    else if (req.url === '/route4') {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');

        fs.readFile('./index.html', 'utf8', function (err, html) {
            if (err) {
                res.statusCode = 500;
                console.error(err);
            } else {
                console.log(html);
                res.write(html); // TODO: This doesn't work
            }
        });
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.write('Not Found');
    }

    res.end();
}).listen(3000, function () {
    console.log("The server started at localhost:3000/");
});
