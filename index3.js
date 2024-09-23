
import {Server} from 'socket.io'
import http from 'http' 
import express from "express";
import bodyParser from "body-parser";

import cors from 'cors';



import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

const jsonParser = bodyParser.json();
const server = http.createServer(app);

const posts=[]
 const corsOptions = {
   origin: 'http://localhost:3000/',//(https://your-client-app.com)
   optionsSuccessStatus: 200,
 };
const io = new Server(server);




 app.use(cors(corsOptions));
app.use( bodyParser.json() );      

// app.post('/post', cors(corsOptions),(req, res) => {
// 	console.log("hey",req.body)
// 	posts.unshift(req.body);
//     res.send(JSON.stringify({"name":"abdi"}))
// });

// app.post('/login', cors(corsOptions),(req, res) => {
//     res.send(JSON.stringify(posts))
// });

// app.get('/post', cors(corsOptions),(req, res) => {
// 	console.log("inside post",req.body.username)
//     res.send(JSON.stringify(posts))
// });


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {

console.log('user connected');
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
      });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

});



server.listen(4000, () => {
  console.log('listening on *:4000');
});

