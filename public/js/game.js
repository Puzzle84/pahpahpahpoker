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

            this.addTable("Rookie Room", 1, 100);
            this.addTable("Pro Corner", 100, 1000);

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
                console.log('table added: ' + newTable.getName());
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
            }
            console.log('player: ' + player.getName() + ' added to game');
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