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

        try {
            const html = fs.readFileSync('./index.html', 'utf8');
            res.write(html);
        } catch (e) {
            res.statusCode = 500;
            console.error(e);
        }
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.write('Not Found');
    }

    res.end();
}).listen(3000, function () {
    console.log("The server started at localhost:3000/");
});
