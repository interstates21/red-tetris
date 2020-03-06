const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const eventTypes = require("./config/socketEvents");

const app = express();
let http = require("http").Server(app);
let io = require("socket.io")(http);

const port = 5001;
http.listen(port, () => console.log(`Running on port ${port}`));

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

const TETROMINOES = {
  0: { shape: [[0]], color: "0, 0, 0" },
  I: {
    shape: [
      [0, "I", 0, 0],
      [0, "I", 0, 0],
      [0, "I", 0, 0],
      [0, "I", 0, 0]
    ],
    color: "80, 227, 230"
  },
  J: {
    shape: [
      [0, "J", 0],
      [0, "J", 0],
      ["J", "J", 0]
    ],
    color: "36, 95, 223"
  },
  L: {
    shape: [
      [0, "L", 0],
      [0, "L", 0],
      [0, "L", "L"]
    ],
    color: "223, 173, 36"
  },
  O: {
    shape: [
      ["O", "O"],
      ["O", "O"]
    ],
    color: "223, 217, 36"
  },
  S: {
    shape: [
      [0, "S", "S"],
      ["S", "S", 0],
      [0, 0, 0]
    ],
    color: "48, 211, 56"
  },
  T: {
    shape: [
      [0, 0, 0],
      ["T", "T", "T"],
      [0, "T", 0]
    ],
    color: "132, 61, 198"
  },
  Z: {
    shape: [
      ["Z", "Z", 0],
      [0, "Z", "Z"],
      [0, 0, 0]
    ],
    color: "227, 78, 78"
  }
};

const randomTetromino = () => {
  const tetrominoes = "IJLOSTZ";
  const randTetromino =
    tetrominoes[Math.floor(Math.random() * tetrominoes.length)];
  return TETROMINOES[randTetromino];
};

const pattern = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
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
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

// export const emitToRoom = (io, roomName, type, name, body) => io.to(roomName).emit(type, { name, body: omit(['intv', 'intvId'],body) });

const updatePattern = pattern => {
  pattern.unshift(pattern.pop());
  return pattern;
};

// io.on("connection", function(socket) {
//   interval = setInterval(
//     () => socket.emit(eventTypes.TIME, { newTetromino: randomTetromino() }),
//     1000
//   );
// });

io.on("connection", function(socket) {
  interval = setInterval(
    () => socket.emit(eventTypes.TIME, { pattern: updatePattern(pattern) }),
    1000
  );
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
