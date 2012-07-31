if (typeof define !== 'function') {
  var define = require('libs/amdefine')(module);
}


define(["exports"], function(exports) {
    function Card(){
        this.ID    = null;
        this.suit  = null;
        this.val   = null;
        this.first = false;
        this.last  = false;

        this.init = function (id, suit, value, first, last) {
            this.ID    = id;
            this.suit  = suit;
            this.val = value;
            this.first = first || false;
            this.last  = last || false;
        };
        this.getId = function (){
            return this.ID;
        };
        this.getSuit = function (){
            return this.suit;
        };
        this.getValue = function (){
            return this.val;
        };
        this.getFirst = function (){
            return this.first;
        };
        this.getLast = function (){
            return this.last;
        };
        this.getFace = function(){
            switch(this.val)
            {
                case 11:
                    return "Jack";
                case 12:
                    return "Queen";
                case 13:
                    return "King";
                case 14:
                    return "Ace";
                default:
                    return this.val;
            }
        };
    }
    exports.card = Card;
});