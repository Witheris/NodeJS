const http = require('http');

const server = http.createServer((req, res) => {
    const urlParts = req.url.split('?');
    const path = urlParts[0];
    const params = new URLSearchParams(urlParts[1]);

    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    if (path === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>Привет, Октагон!</h1>');
        return;
    }
    
    if (path === '/static') {
        res.end(JSON.stringify({
            header: "Hello",
            body: "Octagon NodeJS Test"
        }));
        return;
    }

    if (path === '/dynamic') {
        const a = parseFloat(params.get('a'));
        const b = parseFloat(params.get('b'));
        const c = parseFloat(params.get('c'));

        if (isNaN(a) || isNaN(b) || isNaN(c)) {
            res.end(JSON.stringify({ header: "Error" }));
            return;
        }

        const result = (a * b * c) / 3;
        res.end(JSON.stringify({
            header: "Calculated",
            body: result.toString()
        }));
        return;
    }
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Страница не найдена');
});

server.listen(3000, () => {
    console.log('Сервер запущен: http://localhost:3000');
});
