if (typeof define !== 'function') {
  var define = require('libs/amdefine')(module);
}


define(["table", "player", "deck", "dealer.logic", "card", "exports"], function(p, t, d, dl, c, exports) {
    function Dealer(){
        this.ID = null;
        this.table = null;
        this.deck = null;
        this.active = false;
        this.logic = null;

        this.init = function(id, table) {
            // Set-up
            this.ID = id;
            this.table = table;

            this.deck = new d.deck();
            this.deck.init();

            this.logic = new dl.logic();

            // Logic
            this.deal();
        };

        this.getId = function () {
            return this.ID;
        };

        this.getDeck = function () {
            return this.deck;
        };

        this.getTable = function () {
            return this.table;
        };

        this.getActive = function () {
            return this.active;
        };

        this.deal = function () {
            if(this.active === true){
                this.deck.cutDeck();
                // Initial Hand
                var playersStillPlaying = this.table.findPlayersStillPlaying();
                for(var player = 0; player < playersStillPlaying.length; player++)
                {
                    var hand = this.logic.dealCards(this.deck, 2);
                    var currentPlayer = playersStillPlaying[player];
                    currentPlayer.receiveHand(hand);
                }

                var dealerDiv = $('#'+this.table.getName() +' .dealer .status');

                dealerDiv.append('<div class=event><span>Burn a card!</span></div>');

                this.burnCard();

                //Flop
                dealerDiv.append('<div class=event><span>Flop!</span></div>');
                this.addOpenCards(3);

                dealerDiv.append('<div class=event><span>Burn a card!</span></div>');
                this.burnCard();

                // Turn
                dealerDiv.append('<div class=event><span>Turn!</span></div>');
                this.addOpenCards(1);

                dealerDiv.append('<div class=event><span>Burn a card!</span></div>');
                this.burnCard();

                // River
                dealerDiv.append('<div class=event><span>River!</span></div>');
                this.addOpenCards(1);
                this.active = false;

                this.logic.score(this.table);
            }
        };

        this.burnCard = function () {
            this.logic.dealCards(this.deck, 1);
        };

        this.addOpenCards = function(amount){
            var dealtCards = this.logic.dealCards(this.deck, amount);
            this.table.addOpenCards(dealtCards);
        };

        this.pause = function () {
            this.active = false;
        };

        this.resume = function () {
            this.active = true;
            this.deal();
        };

        this.goHome = function () {
            this.deck.putAway();
        };
    }
    exports.dealer = Dealer;
});
