define(["player", "dealer", "exports"], function(p, d, exports) {
    function Table(){
        this.ID        = null;
        this.Name      = null;
        this.minbet    = null;
        this.maxbet    = null;
        this.tablepot  = null;
        this.sidepot   = null;
        this.players   = [];
        this.opencards = [];

        this.init = function (id, name, minbet, maxbet) {
            this.ID     = id;
            this.Name   = name;
            this.minbet = minbet;
            this.maxbet = maxbet;

            this.dealer = new d.dealer();
            this.dealer.init(id, this);
        };

        this.getId = function () {
            return this.ID;
        };

        this.getName = function () {
            return this.Name;
        };

        this.getMinBet = function() {
            return this.minbet;
        };

        this.getMaxBet = function(){
            return this.maxbet;
        };

        this.getTablePot = function() {
            return this.tablepot;
        };

        this.getSidePot = function() {
            return this.sidepot;
        };

        this.getOpenCards = function() {
            return this.opencards;
        };

        this.addOpenCards = function (dealtCards) {

            for(var i = 0; i < dealtCards.length; i++)
            {
                var dealerDiv = $('#'+this.Name +' .dealer .status');
                dealerDiv.append('<div class=card><span>'+dealtCards[i].getSuit() + ' ' + dealtCards[i].getValue() + '</span></div>');
            }
            var newOpen = this.opencards.concat(dealtCards);
            this.opencards = newOpen;
        };

        this.addToPot = function(bet){
            var playersStillPlaying = this.findPlayersStillPlaying();
            var lowestPurse = this.findLowestPurse();

            if(bet <= lowestPurse){
                this.addToTablePot(bet);
            }
            else{
                this.addToTablePot(lowestPurse);
                this.addtoSidePot(bet - lowestPurse);
            }
        };

        this.addToTablePot = function(bet){
            this.tablepot += bet;
        };

        this.addtoSidePot = function(bet){
            this.sidepot += bet;
        };

        this.addPlayer = function(player){
            this.players.push(player);
            var statusDiv = $('#'+this.getName() +'.status');
            statusDiv.append('<span>' + player.getName() + ' joined!</span>');

            if(this.players.length > 1 )
            {
                if(this.dealer.getDeck().getCards().length === 0)
                {
                    statusDiv.append('<span>enough players dealer initiated!</span>');
                    this.dealer.init();
                }
                else
                {
                    statusDiv.append('<span>enough players dealer re-activated!</span>');
                    this.dealer.resume();
                }
            }
            else
            {
                statusDiv.append('<span>not enough players dealer paused!</span>');
                this.dealer.pause();
            }
        };

        this.removePlayer = function(player){
            var statusDiv = $('#'+this.getName() +'.status');
            statusDiv.append('<span>' + player.getName() + ' left!</span>');

            this.players.pop(player);

            if(this.checkIfTableIsEmpty())
            {
                statusDiv.append('<span>table is empty!</span>');
                this.removeTable();
            }
        };

        this.findPlayersStillPlaying = function(){
            var playersStillPlaying = [];
            for(var i = 0; i < this.players.length; i ++)
            {
                if(this.players[i].playing){
                    playersStillPlaying.push(this.players[i]);
                }
            }

            return playersStillPlaying;
        };

        this.findLowestPurse = function(stillPlaying, bet){
            var lowestPurse = null;
            for(var i = 0; i < stillPlaying.length; i ++)
            {
                if(lowestPurse !== null && lowestPurse > stillPlaying[i].getMoney())
                {
                    lowestPurse = bet;
                }
                else if(lowestPurse === null)
                {
                    lowestPurse = bet;
                }
            }
            return lowestPurse;
        };

        this.checkIfTableIsEmpty = function (){
            if (this.players.length === 0)
            {
                return true;
            }
            return false;
        };

        this.closeTable = function (){
            for(var i = 0; i < this.players.length; i++)
            {
                this.removePlayer(players[i]);
            }

            this.dealer.goHome();
            this.dealer = null;
        };
    }
    exports.table = Table;
});