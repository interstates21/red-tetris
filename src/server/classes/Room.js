const eventTypes = require("../../config/socketEvents");
const Vector2 = require("./Vector2");

class Room {
  constructor({ host, id }) {
    this.id = id;
    this.hostName = host.name;
    this.players = [host];
    this.started = false;
    // this.players = [host];
    this.dropTime = 1000;
    // this.pattern = defaultPattern();
    this.items = ["IJLOSTZ"];
  }

  join(player) {
    this.players.push(player);
  }

  emitPlayers(event, data) {
    this.players.forEach(p => p.emit(event, data));
  }

  isEmpty() {
    return this.players.length <= 0 || this.hostName === null;
  }

  toObject() {
    return {
      pos: this.pos,
      id: this.id,
      started: this.started,
      players: this.players.map((e, index) =>
        e.toObject({ isOwner: index === 0 ? true : false })
      )
    };
  }

  removePlayer(name) {
    this.emitPlayers(eventTypes.ROOM_UPDATE, {
      message: `Player ${name} leaves the room`
    });
    //remove curr room from the player
    if (name === this.hostName) {
      this.emitPlayers(eventTypes.ROOM_UPDATE, {
        message: `Host ${name} leaves the room. The room is being exterminated :()`,
        currentRoom: null
      });
      this.hostName = null;
      this.players = [];
      return;
    }
    this.players = this.players.filter((p, index) => {
      return p.name !== name;
    });
  }

  eventListener() {
    this.players.forEach(p => {
      p.socket.on(eventTypes.MOVEMENT, ({ key }) => {
        console.log(`Moving Player ${p.name}`);
        if (key === "ArrowUp") {
          p.rotate();
        }
        p.move(new Vector2(key));
      });
    });
  }

  startGame() {
    this.started = true;
    this.emitPlayers(eventTypes.ROOM_UPDATE, { message: "The Game starts!" });
    this.eventListener();
  }
}

module.exports = Room;
