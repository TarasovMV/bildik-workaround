import express from 'express';
import * as path from 'path';
import { createServer } from 'node:http';
import type { WebSocket } from 'ws';
import { Server } from 'ws';
import { WsType } from './models';

const port = process.env.PORT || 3333;

const sendMessage = <T>(ws: WebSocket, type: string, data?: T) =>
    ws.send(
        JSON.stringify({
            type,
            data,
        })
    );

const app = express();
const httpServer = createServer(app);
const webSocketServer = new Server({ server: httpServer });

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
    res.send({ message: 'Welcome to server!' });
});

webSocketServer.on('connection', (ws) => {
    ws.on('message', (m) => {
        webSocketServer.clients.forEach((client) => client.send(m));
    });

    ws.on('error', (e) => sendMessage(ws, WsType.Error, e));

    sendMessage(ws, WsType.Message, 'Hi there, I am a WebSocket server');
});

/**
 * Отправка ping pong сообщений
 */
setInterval(() => {
    webSocketServer.clients.forEach((client) =>
        sendMessage(client, WsType.PingPong)
    );
}, 15_000);

const server = httpServer.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);
