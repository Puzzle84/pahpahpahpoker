define(["table", "player", "deck", "card", "exports"], function(p, t, d, c, exports) {
    function Dealer(){
        this.ID = null;
        this.table = null;
        this.deck = null;
        this.active = false;

        this.init = function(id, table) {
            // Set-up
            this.ID = id;
            this.table = table;

            this.deck = new d.deck();
            this.deck.init();

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
                for(var player = 0; player < this.table.findPlayersStillPlaying().length; player++)
                {
                    console.log('Player #'+ player + ':');
                    var hand = this.dealCards(2);
                    var currentPlayer = this.table.findPlayersStillPlaying()[player];
                    currentPlayer.receiveHand(hand);
                }

                console.log('Burn:');
                this.burnCard();

                //Flop
                console.log('Flop:');
                this.addOpenCards(3);

                console.log('Burn:');
                this.burnCard();

                // Turn
                console.log('Turn:');
                this.addOpenCards(1);

                console.log('Burn:');
                this.burnCard();

                // River
                console.log('River:');
                this.addOpenCards(1);
                this.active = false;
            }
        };

        this.burnCard = function () {
            this.dealCards(1);
        };

        this.addOpenCards = function(amount){
            var dealtCards = this.dealCards(amount);
            this.table.addOpenCards(dealtCards);
        };

        this.dealCards = function (amount) {
             if(this.active === true){
                var dealtCards = [];

                for(var i = 0 ; i < amount; i++)
                {
                    dealtCards.push(this.deck.getTopCard());
                }
                return dealtCards;
            }
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

        this.score = function () {
            var first = null;
            var second = null;

            for(var player = 0; player < this.table.Players; player++)
            {
                var currentPlayer = this.table.getPlayers()[player];
                var stack = this.table.getOpenCards(currentPlayer.showHand()).concat().sort();

                if(true){

                }
                else{
                    var highCard = this.findHighestCard(currentPlayer);

                    if(true)
                    {

                    }
                }

            }

        };

        this.findHighestCard = function (player){
            var highest = 2;
            for(var i = 0; i < this.player.getCards().length; i++)
            {
                var currentCard = this.player.getCards()[i].getValue();
                if(currentCard > highest)
                {
                    highest = currentCard;
                }
             }
             return highest;
        };
    }
    exports.dealer = Dealer;
});
