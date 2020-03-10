const EventListener = require("./EventListener");
const defaultPattern = require("../../config/defaultPattern");

// const updatePattern = pattern => {
//   pattern.unshift(pattern.pop());
//   return pattern;
// };

class Room {
  constructor(host) {
    // this.eventListener = new EventListener(socket);
    this.players = [host];
    this.ended = true;
    // this.players = [host];
    this.dropTime = 1000;
  }

  join(player) {}

  run() {
    this.ended = false;
  }

  moveManager() {}
}

module.exports = Room;
