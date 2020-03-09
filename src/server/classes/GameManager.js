const EventListener = require("./EventListener");
const defaultPattern = require('../../config/defaultPattern')

// const updatePattern = pattern => {
//   pattern.unshift(pattern.pop());
//   return pattern;
// };

class GameManager {
  constructor(socket) {
    this.socket = socket;
    this.eventListener = new EventListener(socket);
    this.pattern = defaultPattern;
    this.score = 0;
    this.level = 0;
    this.rows = 0;
    this.ended = false;
    this.dropTime = 1000;
  }

  run() {
    this.eventListener.listenMovement();
  }
}

module.exports = GameManager;
