const EventListener = require("./EventListener");
const Room = require("./Room");
const Player = require("./Player");
const defaultPattern = require("../../config/defaultPattern");
const eventTypes = require("../../config/socketEvents");

// const updatePattern = pattern => {
//   pattern.unshift(pattern.pop());
//   return pattern;
// };

class GameManager {
  constructor(io) {
    this.clients = new Map();
    this.io = io;
    // this.eventListener = new EventListener(socket);
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

  emitAllClients(event, data) {
    this.io.emit(event, data);
  }

  getRoomsArray() {
    return Object.values(this.rooms).map(r => r.toObject());
  }

  run() {
    this.io.on(eventTypes.CONNECTION, socket => {
      console.info(`Client connected unknown id=${socket.id}`);

      this.clients.set(socket.id, { socket, name: "unknown" });
      socket.on(eventTypes.DISCONNECT, () => {
        console.info(
          `Client gone [id=${socket.id} name=${this.clients[socket.id]}]`
        );
        this.clients.delete(socket.id);
      });

      socket.on(eventTypes.MOVEMENT, data => {
        console.log("movement", data);
      });

      socket.on(eventTypes.CREATE_ROOM, data => {
        this.clients.set(socket.id, { socket, name: data.name }); // identify a client

        const newRoomID = this.nRooms;

        const newPlayer = new Player({
          name: data.name,
          socket: this.clients.get(socket.id).socket
        });

        const newRoom = new Room({ id: newRoomID, host: newPlayer });
        this.rooms[newRoomID] = newRoom;
        this.nRooms++;

        const rooms = this.getRoomsArray();
        socket.broadcast.emit(eventTypes.CREATE_ROOM_SUCCESS, {
          message: "Room Successfully Created",
          rooms,
          newRoomID
        });

        socket.emit(eventTypes.JOIN_ROOM_SUCCESS, {
          currentRoom: newRoom.toObject(),
          rooms
        });
      });
    });
  }

  //   for (const [client, sequenceNumber] of sequenceNumberByClient.entries()) {
  //     client.emit("seq-num", sequenceNumber);
  //     sequenceNumberByClient.set(client, sequenceNumber + 1);
  // }
  // this.eventListener.listenMovement().then(({ sender, data }) => {
  //   console.log("key = ", data.key);
  // });

  // this.eventListener.listenJoinRoom().then(({ data }) => {
  //   this.createRoom(data.room);
  //   // socket.on('create', function (room) {
  //   // });
  // });
}

module.exports = GameManager;

// socket.on('say to someone', function(id, msg){
//   socket.broadcast.to(id).emit('my message', msg);
// });
