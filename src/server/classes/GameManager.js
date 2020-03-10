const Room = require("./Room");
const Player = require("./Player");
const eventTypes = require("../../config/socketEvents");

class GameManager {
  constructor(io) {
    this.clients = new Map();
    this.io = io;
    this.rooms = {};
    this.nRooms = 0;
  }

  emitError(socket, message) {
    socket.emit(eventTypes.GAME_ERROR, {
      message,
      rooms: this.getRoomsArray()
    });
  }

  emitUpdateAll(message, payload = {}) {
    // todo ::: broadcast!!!
    this.io.emit(eventTypes.GAME_UPDATE, {
      message: message,
      rooms: this.getRoomsArray(),
      ...payload
    });
  }

  emitUpdateUser(socket, message, payload = {}) {
    socket.emit(eventTypes.GAME_UPDATE, {
      message: message,
      rooms: this.getRoomsArray(),
      ...payload
    });
  }

  startGame({ roomID }) {
    console.log(`Starting Game in ${roomID}`, this.rooms);
    this.emitUpdateAll(`Starting Game in ${roomID}`);
    this.rooms[roomID].startGame();
  }

  clientManager({ socket }) {
    this.clients.set(socket.id, { socket, name: "incognito", room: null });
    console.info(`Client connected incognito id=${socket.id}`);

    this.emitUpdateUser(socket, `You are connected!`, { currentRoom: null });

    socket.on(eventTypes.DISCONNECT, () => {
      const client = this.clients.get(socket.id);
      console.info(`Client gone [id=${socket.id} name=${client.name}]`);
      if (client.room) {
        client.room.removePlayer(client.name);
      }

      this.emitUpdateAll(`Client gone [id=${socket.id} name=${client.name}]`);
      this.clients.delete(socket.id);
    });
  }

  createRoomManager({ socket, data }) {
    // identify a client

    const newRoomID = this.nRooms;

    if (this.duplicateUserExists(socket, data.name)) {
      return;
    }

    const newPlayer = new Player({
      name: data.name,
      socket: this.clients.get(socket.id).socket
    });

    const newRoom = new Room({ id: newRoomID, host: newPlayer });
    this.clients.set(socket.id, { socket, name: data.name, room: newRoom });
    this.rooms[newRoomID] = newRoom;
    this.nRooms++;

    this.emitUpdateAll(`${data.name} CREATES room ${newRoomID}`, { newRoomID });
    socket.emit(eventTypes.JOIN_ROOM_SUCCESS, {
      currentRoom: newRoom.toObject()
    });
  }

  duplicateUserExists(socket, name) {
    this.clients.forEach(client => {
      if (client.name === name) {
        console.log("duplicate!!!");
        this.emitError(socket, "The username exists :(");
        return true;
      }
    });

    return false;
  }

  joinRoomManager({ socket, data }) {
    const newPlayer = new Player({
      name: data.name,
      socket: this.clients.get(socket.id).socket
    });

    // errors //
    const currentRoom = this.rooms[data.roomID];
    if (this.duplicateUserExists(socket, data.name)) {
      return;
    }
    this.clients.set(socket.id, { socket, name: data.name, room: currentRoom });
    currentRoom.join(newPlayer);
    this.emitUpdateAll(`${data.name} joins room ${data.roomID}`);
    socket.emit(eventTypes.JOIN_ROOM_SUCCESS, {
      currentRoom: currentRoom.toObject()
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
