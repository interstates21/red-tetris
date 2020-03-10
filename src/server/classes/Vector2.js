class Vector2 {
  constructor({x, y, key}) {
    if (key) {
      switch (key) {
        case 'ArrowRight':
          this.x = 1;
          this.y = 0;
          break;
        case 'ArrowLeft':
          this.x = -1;
          this.y = 0;
          break;
        case 'ArrowDown':
          this.x = 0;
          this.y = -1;
          break;
        default:
          break;
      }
    }
    else if (x !== undefined && y !== undefined) {
      this.x = x;
      this.y = y;
    }
    else {
      this.x = 0;
      this.y = 0;
    }
  }
}

module.exports = Vector2;
