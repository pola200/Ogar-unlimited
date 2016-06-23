module.exports = function (gameServer,player, split) {
  var msg = function (m) {
    gameServer.pm(player.pID,m);
  }
  if (!split[1]) {
    msg("Please Put a valid ")
  }
  
}
