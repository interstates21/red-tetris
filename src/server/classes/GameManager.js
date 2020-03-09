const EventListener = require("./EventListener");
const defaultPattern = require("../../config/defaultPattern");

// const updatePattern = pattern => {
//   pattern.unshift(pattern.pop());
//   return pattern;
// };

class GameManager {
  constructor(socket) {
    this.socket = socket;
    this.eventListener = new EventListener(socket);
    this.pattern = defaultPattern();
    this.rooms = {};
    this.nRooms = 0;
    this.ended = false;
    this.dropTime = 1000;
  }

  startGame(room) {}

  moveManager() {}

  createRoom(room) {
    this.rooms[`room${this.nRooms}`] = "Hello";
    this.nRooms++;
  }

  run() {
    this.eventListener.listenMovement().then(({ sender, data }) => {
      console.log("key = ", data.key);
    });

    this.eventListener.listenJoinRoom().then(({ data }) => {
      this.createRoom(data.room);
      // socket.on('create', function (room) {
      // });
    });
  }
}

module.exports = GameManager;

// socket.on('say to someone', function(id, msg){
//   socket.broadcast.to(id).emit('my message', msg);
// });
