const defaultPattern = require("../../config/defaultPattern");

// const updatePattern = pattern => {
//   pattern.unshift(pattern.pop());
//   return pattern;
// };

class Room {
  constructor({ host, id }) {
    // this.eventListener = new EventListener(socket);
    this.id = id;
    this.players = [host];
    this.ended = true;
    // this.players = [host];
    this.dropTime = 1000;
  }

  join(player) {
    this.players.push(player);
  }

  toObject() {
    return {
      post: this.pos,
      id: this.id,
      players: this.players.map(e => e.toObject())
    };
  }

  run() {
    this.ended = false;
  }
}

module.exports = Room;
