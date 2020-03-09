const EventListener = require("./EventListener");
const defaultPattern = require("../../config/defaultPattern");

// const updatePattern = pattern => {
//   pattern.unshift(pattern.pop());
//   return pattern;
// };

class Room {
  constructor(socket) {
    this.socket = socket;
    // this.eventListener = new EventListener(socket);
    this.players = {};
    this.ended = true;
    this.dropTime = 1000;
  }

  join(player) {
    const { id } = player;
    if (!this.players[id]) {
      this.players[id] = player;
    } else {
      //error
    }
  }

  run() {
    this.ended = false;
  }

  moveManager() {}
}

module.exports = Room;
