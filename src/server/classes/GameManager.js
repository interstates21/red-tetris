const EventListener = require("./EventListener");
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

  run() {
    this.io.on(eventTypes.CONNECTION, socket => {
      console.info(`Client connected [id=${socket.id}`);
      this.clients.set(socket.id, "unknown");
      // initialize this client's sequence number

      // when socket disconnects, remove it from the list:
      socket.on(eventTypes.DISCONNECT, () => {
        console.info(
          `Client gone [id=${socket.id} name=${this.clients[socket.id]}]`
        );
        this.clients.delete(socket.id);
      });

      socket.on(eventTypes.MOVEMENT, data => {
        console.log("data", data);
      });

      socket.on(eventTypes.CREATE_ROOM, data => {
        this.clients.set(socket.id, data.name); // identify a client
        // console.log("clients =  ", this.clients);
        const newRoomID = this.nRooms;
        this.rooms[newRoomID] = true;
        this.nRooms++;
        console.log("rooms =  ", this.rooms);
        this.emitAllClients(eventTypes.CREATE_ROOM_SUCCESS, {
          message: "Room Successfully Created",
          rooms: this.rooms,
          newRoomID
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
