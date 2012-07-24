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
            console.log(player.getId() + '#: player ' + player.getName() + ' added to table: ' + this.getName());
            if(this.players.length > 1 )
            {
                if(this.dealer.getDeck().getCards().length === 0)
                {
                    console.log('enough players dealer initiated');
                    this.dealer.init();
                }
                else
                {
                    console.log('enough players dealer actived');
                    this.dealer.resume();
                }
            }
            else
            {
                console.log('not enough players dealer paused');
                this.dealer.pause();
            }
        };

        this.removePlayer = function(player){
            this.players.pop(player);
            if(this.checkIfTableIsEmpty())
            {
                this.removeTable();
            }
        };

        this.findPlayersStillPlaying = function(){
            var playersStillPlaying = [];
            for(var i = 0; i < this.players.length; i ++)
            {
                if(this.players[i].playing){
                    playersStillPlaying.push(this.players[i]);
                    console.log(this.players[i].getName() + ' is still playing');
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