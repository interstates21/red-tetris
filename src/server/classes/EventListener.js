const eventTypes = require("../../config/socketEvents");

class EventListener {
  constructor(socket) {
    this.socket = socket;
  }

  listenMovement() {
    this.socket.on(eventTypes.MOVEMENT, data => {
      console.log("Received key =  " + data.key);
    });
  }

  // listenMovement() {
  //   this.socket.on(
  //     eventTypes.JOIN_ROOM, () => Player.joinRoom();
  //   );
  // }
  // listenDisconnect() {
  //   this.socket.on("disconnect", function() {
  //     this.io.emit("user disconnected");
  //   });
  // }
}

module.exports = EventListener;
