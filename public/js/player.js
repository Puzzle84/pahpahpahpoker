define(["card", "exports"], function(c, exports) {
    function Player(){
        this.ID    = null;
        this.Name  = null;
        this.money = null;

        this.cards        = [];
        this.ranks        = [];
        this.currenttable = null;
        this.playing      = false;

        this.init = function(id, name, money) {
            this.ID    = id;
            this.Name  = name;
            this.money = money;

            this.playing      = true;
        };

        this.getId = function () {
            return this.ID;
        };

        this.getName = function () {
            return this.Name;
        };

        this.getMoney = function() {
            return this.money;
        };

        this.joinTable = function(table){
            this.currenttable = table;
        };

        this.receiveHand = function (receivedHand){
            this.flush();
            this.cards = receivedHand;

            $('#'+this.currenttable.getName() +' .players #' +this.Name).append('<div class="cards"></div>');
            var cardsdiv = $('#'+this.currenttable.getName() +' .players #' +this.Name+ ' .cards');
            for(var i = 0; i < this.cards.length; i++)
            {
                var suit = this.cards[i].getSuit();
                var value = this.cards[i].getFace();
                cardsdiv.append('<span class="card ' + suit.toLowerCase() + '">' + value + ' of ' + suit +'</span>');
            }
        };

        this.showHand = function (){
            return this.cards;
        };

        this.flush = function (){
            this.cards = [];
        };

        this.addMoney = function(cash) {
            this.money += cash;
        };

        this.removeMoney = function(cash) {
            this.money -= cash;
        };

        this.addRank = function(rank, winnings) {
            this.ranks.push({rank: winnings});
        };

        this.placeBet = function(bet) {
            this.currenttable.addToPot(bet);
            this.removeMoney(bet);
        };

        this.fold = function() {
            this.playing = false;
        };

        this.leaveTable = function (){
            this.fold();

            if(this.currentTable !== null)
            {
                this.currentTable.removePlayer(this);
            }

            this.currentTable = null;
        };

        this.leaveGame = function () {
            this.leaveTable();
            this.cards = null;
            this.ranks = null;
        };
    }
    exports.player = Player;
});