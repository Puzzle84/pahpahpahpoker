define(["player", "table", "exports"], function(p, t, exports) {
    function Game(){
        this.players = [];
        this.tables = [];
        this.running = false;

        this.init = function(){
            this.running = true;
        };

        this.gameTest = function(){
            var admin = new p.player();
            admin.init(this.players.length, "Admin", 0);
            this.addPlayer(admin);

            this.addTable("Rookie_Room", 1, 100);
            this.addTable("Pro_Corner", 100, 1000);

            var bob = new p.player();
            bob.init(this.players.length, "Bob", 1000);
            this.addPlayer(bob);

            var john = new p.player();
            john.init(this.players.length, "John", 1000);
            this.addPlayer(john);

            var tom = new p.player();
            tom.init(this.players.length, "Tom", 1000);
            this.addPlayer(tom);

            this.joinTable(this.tables[0], bob);
            this.joinTable(this.tables[1], john);
            this.joinTable(this.tables[0], tom);
        };

        this.addTable = function (name, minbet, maxbet)
        {
            if(this.running){
                name = name || "Table" + this.getTableCount();
                minbet = minbet || 1;
                maxbet = maxbet || 100;

                var newTableID = this.tables.length;
                var newTable = new t.table();
                newTable.init(newTableID, name, minbet, maxbet);
                this.tables.push(newTable);

                $('#tables').append('<div class=room id=' + newTable.getName() + '><div class=roomname>' + newTable.getName() +'</div>');

                $('#' +newTable.getName()).append('<div class=dealer><div class=dealername>Dealer</div></div>');
                var dealerDiv = $('#' +newTable.getName()+ ' .dealer');
                dealerDiv.append('<div class=status></div>');

                $('#' +newTable.getName()).append('<div class=players></div>');
            }
        };

        this.getTableCount = function () {
            return this.tables.length;
        };

        this.getTables = function ()
        {
            return this.tables;
        };

        this.showTable = function(tableID) {
            //
        };

        this.addPlayer = function(player)
        {
            if(this.running){
                this.players.push(player);
                $('#players').append('<div class="player" id="'+player.getName()+'"><span>' + player.getName() + '</span></div>');
            }
        };

        this.removePlayer = function(player)
        {
            this.players.pop(player);

            if(this.players.length === 0)
            {
                this.stopGame();
            }
        };

        this.getPlayers = function () {
            var allPlayers = [];

            for(var i = 0; i < this.tables.length; i++)
            {
                var currentTablePlayers = [];
                allPlayers = allPlayers.concat(this.tables[i].findPlayersStillPlaying());
            }
            return allPlayers;
        };

        this.joinTable = function (table, player) {
            player.joinTable(table);
            $('#'+table.getName() + ' .players').append('<div class="player" id="'+player.getName()+'"></div>');
            $('#'+table.getName() + ' .players #' +player.getName()).append('<div class=playername><span>' + player.getName() + '</span></div>');
            table.addPlayer(player);
        };

        this.stopGame = function () {
            for(var i = 0; i < this.tables.length; i++)
            {
                this.tables[i].closeTable();
            }
            this.running = false;
        };
    }
    exports.game = Game;
});