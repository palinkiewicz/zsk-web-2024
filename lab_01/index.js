const http = require('http'),
    fs = require('fs'),
    url = require('url');

http.createServer(function (req, res) {
    const parsedUrl = url.parse(req.url, true);

    res.statusCode = 200;

    if (parsedUrl.pathname === '/route1') {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.write('Strona główna');
    } else if (parsedUrl.pathname === '/route2') {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.write(JSON.stringify({name: 'Adam', age: 18}));
    } else if (parsedUrl.pathname === '/route3') {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.write('<h1>Hello World</h1><p>Lorem ipsum</p>');
    } else if (parsedUrl.pathname === '/route4') {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');

        try {
            const html = fs.readFileSync('./index.html', 'utf8');
            res.write(html);
        } catch (e) {
            res.statusCode = 500;
            console.error(e);
        }
    } else if (parsedUrl.pathname === '/get_params') {
        console.log(parsedUrl.query);
        fs.writeFileSync(`./params_${Date.now()}.json`, JSON.stringify(parsedUrl.query));
        res.write(JSON.stringify({"ok": "ok"}));
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.write('Not Found');
    }

    res.end();
}).listen(3000, function () {
    console.log("The server started at localhost:3000/");
});
