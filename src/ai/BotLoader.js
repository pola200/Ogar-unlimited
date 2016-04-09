'use strict';
// Project imports
var BotPlayer = require('./BotPlayer');
var FakeSocket = require('./FakeSocket');
var PacketHandler = require('../core/PacketHandler');
var fs = require("fs"); // Import the util library

function BotLoader(gameServer) {
  this.gameServer = gameServer;
  this.loadNames();
}

module.exports = BotLoader;

BotLoader.prototype.getName = function () {
  var name = "";
  if (this.gameServer.config.botrealnames == 1) {
    if (this.realrandomNames.length > 0) {
      var index = Math.floor(Math.random() * this.realrandomNames.length);
      name = this.realrandomNames[index];
      this.realrandomNames.splice(index, 1);
    } else {
      name = "bot" + ++this.nameIndex;
      this.loadNames();
    }

  } else {
    // Picks a random name for the bot
    if (this.randomNames.length > 0) {
      var index = Math.floor(Math.random() * this.randomNames.length);
      name = this.randomNames[index];
      this.randomNames.splice(index, 1);
    } else {
      name = "bot" + ++this.nameIndex;
      this.loadNames();
    }
  }

  return name;
};

BotLoader.prototype.loadNames = function () {
  this.randomNames = [];
  this.realrandomNames = [];

  // Load names
  function filterEmpty(name) {
    return x != ''; // filter empty names
  }

  // Read and parse the names - filter out whitespace-only names - fs.readFileSync is only used during server start
  try {
    this.realrandomNames = fs.readFileSync("./realisticnames.txt", "utf8").split(/[\r\n]+/).filter(function (x) {
      return x != ''; // filter empty names
    });
  } catch (e) { /* Nothing, use the default names */
  }

  // Read and parse the names - filter out whitespace-only names - fs.readFileSync is only used during server start
  try {
    this.randomNames = fs.readFileSync("./botnames.txt", "utf8").split(/[\r\n]+/).filter(function (x) {
      return x != ''; // filter empty names
    });
  } catch (e) { /* Nothing, use the default names */
  }

  this.nameIndex = 0;
};

BotLoader.prototype.addBot = function () {
  let s = new FakeSocket(this.gameServer);
  s.playerTracker = new BotPlayer(this.gameServer, s);
  s.packetHandler = new PacketHandler(this.gameServer, s, this.gameServer.config, this.gameServer.getWorld());
  // Add to client list
  this.gameServer.addClient(s);

  // Add to world
  s.packetHandler.setNickname(this.getName());
};
