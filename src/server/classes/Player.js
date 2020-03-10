const Factory = require("./Factory");
const Vector2 = require("./Vector2");

class Player {
  constructor({ name, socket }) {
    this.name = name;
    this.socket = socket;
    this.yOffset = 0;
    this.pos = { x: 0, y: this.yOffset };
    // this.activeItem = Factory.generateItem();
    this.pieces = [];
    this.collided = false;
    this.score = 0;
    this.rows = 0;
  }

  toObject({isOwner}) {
    return {
      pos: this.pos,
      id: this.socket.id,
      name: this.name,
      isOwner
    };
  }

  emit(event, data) {
    this.socket.emit(event, data);
  }

  updatePos() {}

  move(v) {
    this.updatePos(v.x, v.y);
  }

  rotete() {

  }
}

module.exports = Player;
