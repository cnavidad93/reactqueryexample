import express from 'express';
import expressWs from 'express-ws';
import http from 'http';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';

let MOCK_LIST = [
  { id: uuidv4(), name: 'Test 1', amount: 12 },
  { id: uuidv4(), name: 'Test 2', amount: 8 },
  { id: uuidv4(), name: 'Test 5', amount: 4 },
  { id: uuidv4(), name: 'Test 9', amount: 125 },
];

let websocket;
const port = 8088;
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);

const server = http.createServer(app).listen(port);
expressWs(app, server);
console.log('[SERVER] http://localhost:8088');
console.log('[SERVER] ws://localhost:8088/socket');

app.get('/items', (req, res) => {
  console.log('[GET] /items');
  res.status(200).send(JSON.stringify(MOCK_LIST));
});

app.post('/items', (req, res) => {
  console.log('[POST] /items');
  console.log(req.body);

  if (websocket) {
    const newItem = { id: uuidv4(), name: req.body.name, amount: req.body.amount };

    MOCK_LIST = [...MOCK_LIST, newItem];
    websocket.send(JSON.stringify(MOCK_LIST));
  }
  return res.sendStatus(200);
});

app.ws('/socket', (ws) => {
  websocket = ws;
  console.log('[WEB-SOCKET] Client conected');

  setTimeout(() => {
    ws.send(JSON.stringify(MOCK_LIST));
  }, 1000);

  // ws.on('message', (msg) => {
  //   console.log('[WEB-SOCKET] received: %s', msg);

  //   if (msg.type == 'NEW_ITEM') {
  //     const newItem = { id: uuidv4(), name: msg.data.name, amount: msg.data.amount };

  //     MOCK_LIST = [...MOCK_LIST, newItem];
  //     ws.send(JSON.stringify(MOCK_LIST));
  //   }
  // });
});
