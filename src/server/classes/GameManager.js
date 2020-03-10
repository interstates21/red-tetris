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
    this.io.emit(eventTypes.GAME_UPDATE, {
      message: `Starting Game in ${roomID}`,
      rooms: this.getRoomsArray()
    });
    this.rooms[roomID].startGame();
  }

  clientManager({ socket }) {
    this.clients.set(socket.id, { socket, name: "incognito", room: null });
    console.info(`Client connected incognito id=${socket.id}`);

    socket.emit(eventTypes.GAME_UPDATE, {
      message: `You are connected!`,
      rooms: this.getRoomsArray(),
      currentRoom: null,
    });
  
    socket.on(eventTypes.DISCONNECT, () => {
      const client = this.clients.get(socket.id)
      console.info(
        `Client gone [id=${socket.id} name=${client.name}]`
      );
      if (client.room) {
        client.room.removePlayer(client.name);
      }
      this.io.emit(eventTypes.GAME_UPDATE, {
        message: `Client gone [id=${socket.id} name=${client.name}]`,
        rooms: this.getRoomsArray(),
      });

      this.clients.delete(socket.id);
    });
  }

  createRoomManager({ socket, data }) { // identify a client

    const newRoomID = this.nRooms;

    const newPlayer = new Player({
      name: data.name,
      socket: this.clients.get(socket.id).socket
    });

    const newRoom = new Room({ id: newRoomID, host: newPlayer });
    this.clients.set(socket.id, { socket, name: data.name, room: newRoom });
    this.rooms[newRoomID] = newRoom;
    this.nRooms++;


    this.io.emit(eventTypes.GAME_UPDATE, {
      message: `${data.name} CREATES room ${newRoomID}`,
      newRoomID,
      rooms: this.getRoomsArray(),
    });

  
    socket.emit(eventTypes.JOIN_ROOM_SUCCESS, {
      currentRoom: newRoom.toObject(),
    });
  }

  joinRoomManager({ socket, data }) {
    console.log(`${data.name} JOINS room ${data.roomID}`, data);
    const newPlayer = new Player({
      name: data.name,
      socket: this.clients.get(socket.id).socket
    });

    // errors ///
    const currentRoom = this.rooms[data.roomID];
    this.clients.set(socket.id, { socket, name: data.name, room: currentRoom });
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
