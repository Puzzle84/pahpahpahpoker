define(["card","exports"],function(e,t){function n(){this.ID=null,this.Name=null,this.money=null,this.cards=[],this.ranks=[],this.currenttable=null,this.playing=!1,this.init=function(e,t,n){this.ID=e,this.Name=t,this.money=n,this.playing=!0},this.getId=function(){return this.ID},this.getName=function(){return this.Name},this.getMoney=function(){return this.money},this.joinTable=function(e){this.currenttable=e},this.receiveHand=function(e){this.flush(),this.cards=e},this.showHand=function(){return this.cards},this.flush=function(){this.cards=[]},this.addMoney=function(e){this.money+=e},this.removeMoney=function(e){this.money-=e},this.addRank=function(e,t){this.ranks.push({rank:t})},this.placeBet=function(e){this.currenttable.addToPot(e),this.removeMoney(e)},this.fold=function(){this.playing=!1},this.leaveTable=function(){this.fold(),this.currentTable!==null&&this.currentTable.removePlayer(this),this.currentTable=null},this.leaveGame=function(){this.leaveTable(),this.cards=null,this.ranks=null}}t.player=n})