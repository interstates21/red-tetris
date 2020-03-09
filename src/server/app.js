const eventTypes = require("../config/socketEvents");
const GameManager = require("./classes/GameManager");

class SocketIOServer {
  constructor(port, app, http, io) {
    this.port = port;
    this.app = app;
    this.http = http;
    this.io = io;
    this.gameManager = null;
    // this.config = require("../../config/config");
  }

  initDb() {
    // const Database = require("./database");
    // let database = new Database();
    // database.connect();
  }

  initIO() {
    this.io.on(eventTypes.CONNECTION, socket => {
      this.gameManager = new GameManager(socket);
      this.gameManager.run();
    });
  }

  run() {
    this.http.listen(this.port, () => {
      console.log(`Example app listening at port ${this.port}`);
    });
  }
}

module.exports = SocketIOServer;
