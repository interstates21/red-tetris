const Factory = require("./Factory");
const Vector2 = require("./Vector2");

class Player {
  constructor() {
    this.yOffset = 0;
    this.pos = { x: 0, y: this.yOffset };
    // this.activeItem = Factory.generateItem();
    this.pieces = [];
    this.collided = false;
    this.score = 0;
    this.rows = 0;
  }

  updatePos() {}

  drop() {
    this.updatePos(new Vector2(0, 1));
  }

  move(dir) {
    this.updatePos(new Vector2(dir, 0));
  }
}

module.exports = Player;


// joinRoom(socket, io, data, rooms, currentSocketId) {
//     const { roomName, user } = data;
//     const roomIndex = findIndex(propEq('roomName', roomName))(rooms);
//     const room = rooms[roomIndex];
//     const fullRoom = roomIndex >= 0 && length(rooms[roomIndex].users) >= 2;
//     const isRoomDefined = !isNil(room);
//     const allreadyInRoom = !isRoomDefined ? false : !isNil(find(propEq('name', user),room.users));
//     const gameStarted = isRoomDefined ? room.isGameStarted : false;
    
//     if(fullRoom) {
//         if(allreadyInRoom)
//             emitToSocket(socket, GAME_ERROR, ALLREADY_IN_ROOM, `${user} is allready in this room !`)
//         else
//             emitToSocket(socket, GAME_ERROR, FULL_ROOM, 'This room is full');
//         playerLogger(`${user} try to join ${roomName}, but the room is full`);
//     } else {
//         if(gameStarted) {
//             emitToSocket(socket, GAME_ERROR, GAME_STARTED, 'Game in progress in this room !');
//         } else if(allreadyInRoom) {
//             playerLogger(`${user} try to join the ${roomName} room, but he's allready in`);
//             emitToSocket(socket, GAME_ERROR, 'allreadyInRoom', `${user} is allready in this room !`);
//         } else {
//             const newUser = {
//                 name: user,
//                 owner: isRoomDefined ? false : true,
//                 id: currentSocketId[0],
//                 board: initialBoard,
//                 win: null,
//                 activePiece: null,
//                 lineToGive: 0,
//                 score: 0,
//             };
//             const newToasts = [Game.newToast(`${user} join the room`)];

//             socket.join(roomName);
//             if(roomIndex < 0) rooms = Game.addRoom(rooms, [newUser], roomName);
//             else rooms[roomIndex] = {...room, users: [...rooms[roomIndex].users, newUser], name: roomName};
//             const newRoom = rooms[roomIndex] || rooms[findIndex(propEq('roomName', roomName))(rooms)];
//             emitToRoom(io, roomName, ACTION, UPDATE_GAME_INFO, {
//                 ...newRoom,
//                 toasts: newToasts
//             });
//             removeToast(io, roomName, newToasts[0].id);
//             playerLogger(`${user} join the ${roomName} room`);
//         }
//     }
//     return rooms;
// }