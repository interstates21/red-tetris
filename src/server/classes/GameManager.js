const Room = require("./Room");
const Player = require("./Player");
const defaultPattern = require("../../config/defaultPattern");
const eventTypes = require("../../config/socketEvents");

class GameManager {
  constructor(io) {
    this.clients = new Map();
    this.io = io;
    this.rooms = {};
    this.nRooms = 0;
  }

  startGame({ roomID }) {
    console.log(`Starting Game in ${roomID}`, this.rooms);
    this.rooms[roomID].startGame();
  }

  clientManager({ socket }) {
    console.info(`Client connected unknown id=${socket.id}`);
    this.clients.set(socket.id, { socket, name: "unknown" });
    socket.on(eventTypes.DISCONNECT, () => {
      //todo delete room
      console.info(
        `Client gone [id=${socket.id} name=${this.clients[socket.id]}]`
      );
      this.clients.delete(socket.id);
    });
  }

  createRoomManager({ socket, data }) {
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

    this.io.emit(eventTypes.GAME_UPDATE, {
      message: `${data.name} CREATES room ${newRoomID}`,
      newRoomID,
      rooms
    });

    socket.emit(eventTypes.JOIN_ROOM_SUCCESS, {
      currentRoom: newRoom.toObject(),
    });
  }

  joinRoomManager({ socket, data }) {
    this.clients.set(socket.id, { socket, name: data.name }); // identify a client

    console.log(`${data.name} JOINS room ${data.roomID}`, data);
    const newPlayer = new Player({
      name: data.name,
      socket: this.clients.get(socket.id).socket
    });

    // errors ///
    const currentRoom = this.rooms[data.roomID];
    currentRoom.join(newPlayer);
    const rooms = this.getRoomsArray();

    this.io.emit(eventTypes.GAME_UPDATE, {
      message: `${data.name} joins room ${data.roomID}`,
      rooms
    });

    socket.emit(eventTypes.JOIN_ROOM_SUCCESS, {
      currentRoom: currentRoom.toObject(),
    });
  }

  getRoomsArray() {
    return Object.values(this.rooms).map(r => r.toObject());
  }

  run() {
    this.io.on(eventTypes.CONNECTION, socket => {
      this.clientManager({ socket });
      socket.on(eventTypes.CREATE_ROOM, data => {
        console.log("CREATE_ROOM", data);
        this.createRoomManager({ socket, data });
      });

      socket.on(eventTypes.JOIN_ROOM, data => {
        console.log("JOIN_ROOM", data);
        this.joinRoomManager({ socket, data });
      });

      socket.on(eventTypes.START_GAME, ({ roomID }) => {
        console.log("START_GAME", roomID);
        this.startGame({ socket, roomID });
      });
    });
  }
}

module.exports = GameManager;
