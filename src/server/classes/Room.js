const eventTypes = require("../../config/socketEvents");
const Vector2 = require('./Vector2');

class Room {
  constructor({ host, id }) {
    this.id = id;
    this.players = [host];
    this.started = false;
    // this.players = [host];
    this.dropTime = 1000;
    // this.pattern = defaultPattern();
    this.items = ['IJLOSTZ']
  }

  join(player) {
    this.players.push(player);
  }

  emitPlayers(event, data) {
    this.players.forEach(p => p.emit(event, data));
  }

  toObject() {
    return {
      pos: this.pos,
      id: this.id,
      started: this.started,
      players: this.players.map((e, index) => e.toObject({isOwner: index === 0 ? true : false}))
    };
  }

  eventListener() {
    this.players.forEach(p => {
      p.socket.on(eventTypes.MOVEMENT, ({key}) => {
        console.log(`Moving Player ${p.name}`)
        if (key === 'ArrowUp') {
          p.rotate();
        }
        p.move(new Vector2(key))
      })
    });
  }

  startGame() {
    this.started = true;
    this.emitPlayers(eventTypes.GAME_UPDATE, { message: "The Game starts!" });
    this.eventListener();
  }
}

module.exports = Room;
