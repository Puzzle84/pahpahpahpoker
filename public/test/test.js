require(['game', 'player', 'table', 'card', 'deck', 'dealer', 'dealer.logic', 'libs/jquery-1.7.2'], function   (g, p, t, c, d, dl, dll, $) {
  describe('Client', function () {

    //Game object
    describe('game.js', function () {
      it('Game object exists ', function (done) {
        var game = new g.game();

        expect(game).to.not.equal(null);
        done();
      });

      it('Game object has tables after initializing ', function (done) {
        var game = new g.game();

        game.init();

        expect(game.getTables()).to.not.equal(null);
        done();
      });

      it('Tables contains a table after adding a table ', function (done) {
        var game = new g.game();
        game.init();

        game.addTable("Rookie Room", "1", "100");

        expect(game.getTables().length).to.equal(1);
        done();
      });

      it('Game object contains 3 players after running the test sequence ', function (done) {
        var game = new g.game();
        game.init();

        game.gameTest();

        expect(game.getPlayers().length).to.equal(3);
        done();
      });
    });

    // Dealer object
    describe('dealer.js', function () {
      it('Dealer object exists ', function (done) {
        var dealer = new dl.dealer();

        expect(dealer).to.not.equal(null);
        done();
      });

      it('Dealer object has logic ', function (done) {
        var dealer = new dl.dealer();

        dealer.init(1, new t.table().init(1, 'bob', 1, 100));

        expect(dealer.logic).to.not.equal(null);
        done();
      });
    });

    // Dealer logic
    describe('dealer.logic.js', function () {
      it('Dealer Logic object exists ', function (done) {
        var logic = new dll.logic();
        expect(logic).to.not.equal(null);
        done();
      });
    });

    // Deck object
    describe('deck.js', function () {
      it('Deck object exists ', function (done) {
        var deck = new d.deck();

        expect(deck).to.not.equal(null);
        done();
      });
    });

    // Card object
    describe('card.js', function () {
      it('Card object exists ', function (done) {
        var card = new c.card();

        expect(card).to.not.equal(null);
        done();
      });
    });

    //Player object
    describe('player.js', function () {
      it('Player object exists ', function (done) {
        var player = new p.player();

        expect(player).to.not.equal(null);
        done();
      });
    });

  });

  // Server object
  describe('Server', function () {
    it('random test to show tests can fail ', function (done) {
        expect(1 + 1).to.equal(11);
        done();
      });
  });
});