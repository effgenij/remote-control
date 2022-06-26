
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
    const wsStream = createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: false });
    wsStream.on('data', async (chunk) => {
        const [command, x, y] = chunk.split(' ');
        process.stdout.write(`Recieved: ${chunk}`);
        wsStream.write(command);
        try {
            const response = await controller(command, x, y);
            if (typeof(response) === 'string') {
            wsStream.write(response);
            }
            process.stdout.write(`Command: "${command}" executed without errors.`);
        } catch (err: any) {
            process.stdout.write(`Command: "${command}" not executed. Error message: ${err.message}`);
        };
    });
    wsStream.on('end', () => {
        process.stdout.write('Client was closed');
    });

});


process.on('SIGINT', () => { 
    wss.close();
    process.stdout.write('Websocket connection will be closed.')
    process.exit(0);
});
