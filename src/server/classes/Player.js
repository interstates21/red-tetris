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

  toObject() {
    return {
      pos: this.pos,
      id: this.socket.id,
      name: this.name
    };
  }

  emit(event, data) {
    this.socket.emit(event, data);
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
