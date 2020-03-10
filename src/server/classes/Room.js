const eventTypes = require("../../config/socketEvents");

class Room {
  constructor({ host, id }) {
    this.id = id;
    this.players = [host];
    this.ended = true;
    // this.players = [host];
    this.dropTime = 1000;
  }

  join(player) {
    this.players.push(player);
  }

  emitPlayers(event, data) {
    this.players.forEach(p => p.emit(event, data));
  }

  toObject() {
    return {
      post: this.pos,
      id: this.id,
      players: this.players.map(e => e.toObject())
    };
  }

  startGame() {
    this.ended = false;
    this.emitPlayers(eventTypes.NOTIFICATION, { message: "The Game starts!" });
  }
}

module.exports = Room;
