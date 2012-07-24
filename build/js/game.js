define(["player","table","exports"],function(e,t,n){function r(){this.players=[],this.tables=[],this.running=!1,this.init=function(){this.running=!0},this.gameTest=function(){var t=new e.player;t.init(this.players.length,"Admin",0),this.addPlayer(t),this.addTable("Rookie_Room",1,100),this.addTable("Pro_Corner",100,1e3);var n=new e.player;n.init(this.players.length,"Bob",1e3),this.addPlayer(n);var r=new e.player;r.init(this.players.length,"John",1e3),this.addPlayer(r);var i=new e.player;i.init(this.players.length,"Tom",1e3),this.addPlayer(i),this.joinTable(this.tables[0],n),this.joinTable(this.tables[1],r),this.joinTable(this.tables[0],i)},this.addTable=function(e,n,r){if(this.running){e=e||"Table"+this.getTableCount(),n=n||1,r=r||100;var i=this.tables.length,s=new t.table;s.init(i,e,n,r),this.tables.push(s),$("#tables").append("<div class=room id="+s.getName()+"><span>"+s.getName()+"</span><br>"),$("#"+s.getName()).append("<div class=dealer></div>");var o=$("#"+s.getName()+" .dealer");o.append("<div class=status></div>"),$("#"+s.getName()).append("<div class=players></div>")}},this.getTableCount=function(){return this.tables.length},this.getTables=function(){return this.tables},this.showTable=function(e){},this.addPlayer=function(e){this.running&&(this.players.push(e),$("#players").append('<div class="player" id="'+e.getName()+'"><span>'+e.getName()+"</span></div>"))},this.removePlayer=function(e){this.players.pop(e),this.players.length===0&&this.stopGame()},this.getPlayers=function(){var e=[];for(var t=0;t<this.tables.length;t++){var n=[];e=e.concat(this.tables[t].findPlayersStillPlaying())}return e},this.joinTable=function(e,t){t.joinTable(e),$("#"+e.getName()+" .players").append('<div class="player" id="'+t.getName()+'"><span>'+t.getName()+"</span></div>"),e.addPlayer(t)},this.stopGame=function(){for(var e=0;e<this.tables.length;e++)this.tables[e].closeTable();this.running=!1}}n.game=r})