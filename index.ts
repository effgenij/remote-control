import Jimp from 'jimp';
import robot from 'robotjs';
import { createWebSocketStream, WebSocketServer } from 'ws';
import httpServer from './src/http_server/index';
import controller from './src/controller'

const HTTP_PORT = 3000;
const WEBSOCKET_PORT = 8080;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: WEBSOCKET_PORT });

wss.on('connection', ws => {
    console.log(`Start websocket server on the ${WEBSOCKET_PORT} port!`);
    const wsStream = createWebSocketStream(ws, { encoding: 'utf8' });
    wsStream.on('data', (chunk) => {
        //console.log(chunk);
        controller(chunk);
    });
    wsStream.on('end', () => {
        console.log('Client was closed');
    });

});


process.on('SIGINT', () => { 
    wss.close();
    console.log('Websocket connection will be closed.')
    process.exit(0);
});
