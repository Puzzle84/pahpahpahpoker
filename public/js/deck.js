define(["card", "exports"], function(c, exports) {
    function Deck(){
        this.suits     = [];
        this.cards     = [];
        this.usedcards = [];

        this.init = function() {
            this.suits = ["Hearts", "Diamonds", "Clubs", "Spades"];

            this.fillDeck();
            this.shuffleDeck();
        };

        this.fillDeck = function (){
            for(var i = 0; i < this.suits.length; i++)
            {
                for(var j = 2; j <= 13; j++)
                {
                    // new Card(id, suit, value, firstCard, lastCard)
                    var newCard = new c.card();
                    if(j === 2 ) {
                        this.addCard(this.suits[i], j, true, false);
                    }
                    else if (j === 13) {
                        this.addCard(this.suits[i], j, false, true);
                    }
                    else {
                        this.addCard(this.suits[i], j, false, false);
                    }
                }
            }
        };

        this.addCard = function (suit, value, first, last) {
            var newCard = new c.card();
            newCard.init(this.cards.length, suit, value, first, last);
            this.cards.push(newCard);
        };

        this.getCards = function () {
            return this.cards;
        };

        this.cutDeck = function () {
            var middle = this.cards.length / 2;
            var remainder = this.cards.length - middle;
            var back = this.cards.splice(middle, remainder);
            var newDeck = back.concat(this.cards);

            this.cards = newDeck;
        };

        this.shuffleDeck = function () {
            this.cards.shuffle();
        };

        this.getTopCard = function() {
            var topCard = this.cards.shift();
            this.usedcards.push(topCard);
            console.log("Card suit: " + topCard.getSuit() + " | Card value: " + topCard.getValue());
            return topCard;
        };

        this.putAway = function () {
            this.cards.clear();
            this.usedcards.clear();
        };
    }
    exports.deck = Deck;
});