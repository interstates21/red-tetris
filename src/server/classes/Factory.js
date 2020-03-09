const ITEMS = require("../../config/items");

class Factory {
//   constructor() {}

  static generateItem() {
    const items = "IJLOSTZ";
    const rand = items[Math.floor(Math.random() * items.length)];

    return ITEMS[rand];
  }
}

module.exports = Factory;
