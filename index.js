
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
  origin: ["http://adenmali.com","http://adenmali.com/:80","http://localhost:3000","http://adenmali.com/:3000"],
   optionsSuccessStatus: 200,
 };
const io = new Server(server,{
  cors: {
      origin: ["http://adenmali.com","http://adenmali.com/:80","http://localhost:3000","http://adenmali.com/:3000"]
  }
});




app.use(cors(corsOptions));
app.use( bodyParser.json() );      




app.get('/', (req, res) => {
  console.log('get index html');
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {

// console.log('user connected');
    socket.on('chat message', (msg) => {
      console.log('message received',msg);
        io.emit('chat messagew', msg);
      });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

});



server.listen(4000, () => {
  console.log('listening on *:4000');
});

