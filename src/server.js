const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path')


const app = express();
let http = require("http").Server(app);
let io = require("socket.io")(http);


const port = process.env.PORT || 5000;
http.listen(port,  () => console.log(`Running on port ${port}`));

// io.on('connection', function (socket) {
//     socket.emit('news', { hello: 'world' });
//     socket.on('my other event', function (data) {
//       console.log(data);
//     });
//   });

// io.on("connection", socket => {
//     console.log("New client connected"), setInterval(
//       () => getApiAndEmit(socket),
//       10000
//     );
//     socket.on("disconnect", () => console.log("Client disconnected"));
//   });


// const items = require('./routes/api/items')


app.use(bodyParser.json());

// const db = require('./server/config/keys').mongoUri;

// mongoose.connect(db)
// .then(() => console.log("MongoDB connected"))
// .catch(err => console.log(err))


// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
// });


//   io.on("connection", socket => {
//     console.log("New client connected");
//     if (interval) {
//       clearInterval(interval);
//     }
//     interval = setInterval(() =>  socket.emit("village", "Space"), 1000);
//     socket.on("disconnect", () => {
//       console.log("Client disconnected");
//     });
//   });


const pattern = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];


  // export const emitToRoom = (io, roomName, type, name, body) => io.to(roomName).emit(type, { name, body: omit(['intv', 'intvId'],body) });

  const updatePattern = (pattern) => {
    pattern.unshift(pattern.pop());
    return (pattern);
  }


io.on('connection', function (socket) {
    interval = setInterval(() =>  socket.emit("time", {pattern: updatePattern(pattern)}), 1000);
  });


// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static('../client/build'));
//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
//     })
// }

// app.use('/api/items', items);


// app.listen(
//     port, 
//     () => console.log(`Running on port ${port}`)
// );

