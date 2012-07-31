if (typeof define !== 'function') {
  var define = require('libs/amdefine')(module);
}

requirejs(['tools', 'game'], function(t , g){
    var game = new g.game();
    game.init();

    game.gameTest();
});