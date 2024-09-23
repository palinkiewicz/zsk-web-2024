import mime from 'mime-types';
import fs from 'fs';

export function findFile(filename, res) {
    try {
        const file = fs.readFileSync(filename, 'utf8');

        res.writeHead(200, { 'Content-Type': mime.lookup(filename.split('/').at(-1)) ?? 'text/plain' });
        res.write(file);
    } catch (e) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({"status": "404", "message": "Not found"}));
    }
}
