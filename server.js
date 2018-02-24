const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const api = require('./backend/routes');
const WebSocket = require('ws');
const ws = new WebSocket('wss://s1.ripple.com:443');
app.use(express.static(path.join(__dirname, 'public')));

var portscanner = require('portscanner');

ws.on('open', () => {
    const JSONObj = {"id": 1,
        "command": "subscribe",
        "streams": ["ledger"]};
    ws.send(JSON.stringify(JSONObj));
});

// ws.on('message', (data) => {
//     console.log("DATA", data);
// });

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/public/index.html'); // For React/Redux
});

app.use('/api', api);

function checkPort(port, previousNodes) {
    portscanner.checkPortStatus(port, '127.0.0.1', (scanError, status) => {
        // Status is 'open' if currently in use or 'closed' if available
        if(status === 'open') {
            checkPort(port + 1, previousNodes.concat(port));
        } else if( status === 'closed') {
            app.listen(port, error => {
                error
                ? console.error(error)
                : console.info(`==> 🌎 Listening on port ${port}. Visit http://localhost:${port}/ in your browser.`);
                console.log("Previous nodes", previousNodes);
                const wss = new WebSocket.Server({ port, host: '127.0.0.1' });
                const alreadySentArr = [];
                const neverClose = [];
                wss.on('connection', function connection(myServer) {
                    myServer.on('message', function incoming(data) {
                        const newData = JSON.parse(data);
                        if(newData.isServer) {
                            const newChild = new WebSocket('ws://127.0.0.1:' + newData.port + '/');
                            newChild.on('open', () => {
                                newChild.send(JSON.stringify({"isServer": false, "port": port, "message": "backtrack"}));
                            });
                            newChild.on('message', (message) => {
                                const newMessage = JSON.parse(message);
                                console.log("message", port, message, alreadySentArr);
                                wss.clients.forEach((client) => {
                                    if(client.readyState === WebSocket.OPEN && alreadySentArr.indexOf(client._ultron.id) === -1) {
                                        client.send(JSON.stringify({"message": newMessage.message, "port": newMessage.port, "username": newMessage.username, "clientId": client._ultron.id}));
                                    }
                                });
                            });
                            newChild.on('close', () => {
                                console.log("disconnected from port", newData.port);
                                console.log("alreadySentArr", alreadySentArr, neverClose);
                                console.log("newChild", newChild);
                            });
                        }

                        wss.clients.forEach((client) => {
                            if(newData.port && neverClose.indexOf(client._ultron.id) === -1) {
                                alreadySentArr.push(client._ultron.id);
                            } else {
                                neverClose.push(client._ultron.id);
                            }
                            if(client.readyState === WebSocket.OPEN) {
                                client.send(JSON.stringify({"message": newData.message, "port": newData.port, "username": newData.username, "clientId": client._ultron.id}));
                            }
                        });
                    });
                    myServer.on('close', () => {

                    });
                });
                if (previousNodes.length > 0) {
                    previousNodes.forEach(targetPort => {
                        const wsOther = new WebSocket('ws://127.0.0.1:' + targetPort + '/');
                        wsOther.on('open', function connection(otherClient) {
                            wsOther.send(JSON.stringify({"isServer": true, "port": port, "message": "suppp" + port}));
                        });

                        wsOther.on('message', function connection(message) {
                            const newMessage = JSON.parse(message);
                            const clientIds = [];
                            wss.clients.forEach(client => clientIds.push(client._ultron.id));
                            wss.clients.forEach((client) => {
                                if(alreadySentArr.indexOf(client._ultron.id) === -1) {
                                    client.send(JSON.stringify({"message": newMessage.message, "port": newMessage.port, "username": newMessage.username, "clientId": newMessage.clientId}));
                                }
                            });
                        });
                    });
                }
            });
        }
    });
}

checkPort(3000, []);
