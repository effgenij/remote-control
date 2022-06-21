import Jimp from 'jimp';
import robot from 'robotjs';
import { WebSocketServer } from 'ws';
import httpServer from './src/http_server/index';

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', ws => {
    ws.on('message', data => {
        console.log('received: %s', data);
    });

    ws.send('something');
    ws.send('test');
});

wss.on('close', () => {
    console.log('End');
});