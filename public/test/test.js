
requirejs(['game', 'player', 'table', 'card', 'deck', 'dealer'], function   (g, p, t, c, d , dl) {
  describe('Game', function () {
    it('Game should exist ', function (done) {
      var game = new g.game();

      expect(game).to.not.equal(null);
      done();
    });

    it('Tables should exist ', function (done) {
      var game = new g.game();

      game.init();

      expect(game.getTables()).to.not.equal(null);
      done();
    });

    it('Tables should have a tables ', function (done) {
      var game = new g.game();
      game.init();

      game.addTable("Rookie Room", "1", "100");

      expect(game.getTables().length).to.equal(1);
      done();
    });

    it('Gamne should fully run ', function (done) {
      var game = new g.game();
      game.init();

      game.gameTest();

      expect(game.getPlayers().length).to.equal(3);

      done();
    });
  });
});