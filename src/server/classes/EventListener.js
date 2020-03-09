const eventTypes = require("../../config/socketEvents");

class EventListener {
  constructor(socket) {
    this.socket = socket;
  }

  listenMovement() {
    return new Promise(resolve => {
      this.socket.on(eventTypes.MOVEMENT, (sender, data) => {
        console.log("data", data);
        resolve({ sender, data });
      });
    });
  }

  listenJoinRoom() {
    return new Promise(resolve => {
      this.socket.on(eventTypes.JOIN_ROOM, (sender, data) => {
        resolve({ sender, data });
      });
    });
  }
}

module.exports = EventListener;
