if (typeof define !== 'function') {
  var define = require('libs/amdefine')(module);
}


define(["table", "deck", "exports"], function(t, d, exports) {
    function Logic(){

        this.dealCards = function (deck, amount) {
            var dealtCards = [];

            for(var i = 0 ; i < amount; i++)
            {
                dealtCards.push(deck.getTopCard());
            }
            return dealtCards;
        };

        this.score = function (table) {
            var first = null,
                second = null,
                tablePlayers = table.findPlayersStillPlaying(),
                openCards = table.getOpenCards();

            for(var player = 0; player < tablePlayers.length; player++)
            {

                var currentPlayer = tablePlayers[player],
                    stack = openCards.concat(currentPlayer.showHand()).sort(this.cardComperator),
                    lastval = null,
                    lastcheckedval = null,
                    flush = null,
                    highCard = 2,
                    hand = 0,
                    pair = false,
                    twopair = false,
                    threeofakind = false;

                for(var i = 0; i < stack.length; i++){
                    flush = this.findFlush(stack);

                    if(flush === 9)
                    {
                        if(hand < 9)
                        {
                            hand = 9;
                        }
                    }
                    else if(flush === 8)
                    {
                        if(hand < 8)
                        {
                            hand = 8;
                        }
                    }
                    else if(flush === 5)
                    {
                        if(hand < 5)
                        {
                            hand = 5;
                        }
                    }
                    else if(flush === 4)
                    {
                        if(hand < 4)
                        {
                            hand = 4;
                        }
                    }

                    if((hand < 8) && (stack[i].getValue() !== lastcheckedval)) {
                        lastcheckedval = stack[i].getValue();

                        var occurences = this.findOccurences(stack[i], stack);

                        if(occurences > 3)
                        {
                            if(hand < 7)
                            {
                                hand = 7;
                            }
                        }
                        else if(occurences > 2)
                        {
                            if(threeofakind === true)
                            {
                                if(hand < 6)
                                {
                                    hand = 6;
                                }
                            }
                            else if(twopair === true)
                            {
                                if(hand < 6)
                                {
                                    hand = 6;
                                }
                            }
                            else if(pair === true)
                            {
                                if(hand < 6)
                                {
                                    hand = 6;
                                }
                            }

                            threeofakind = true;
                            if(hand < 3)
                            {
                                hand = 3;
                            }
                        }
                        else if(occurences > 1)
                        {
                            if(threeofakind === true)
                            {
                                if(hand < 6)
                                {
                                    hand = 6;
                                }
                            }
                            else if(pair === true)
                            {
                                if(hand < 2)
                                {
                                    hand = 2;
                                }
                                twopair = true;
                            }

                            if(hand < 1)
                            {
                                hand = 1;
                            }
                            pair = true;
                        }
                    }
                }

                highCard = this.findHighestCard(stack);

                var playerDiv = $('#' + table.getName() + ' .players #' +currentPlayer.getName());
                if(hand === 9){
                    // Royal Flush
                    playerDiv.append('<span>Royal Flush with the '+ highCard.getFace()  +' of ' + highCard.getSuit() + ' </span>');
                }
                else if(hand === 8){
                    // Straight Flush
                    playerDiv.append('<span>Royal Flush with the '+ highCard.getFace()  +' of ' + highCard.getSuit() + ' </span>');
                }
                else if(hand === 7){
                    // Four of a kind
                    playerDiv.append('<span>Four of a kind with the '+ highCard.getFace()  +' of ' + highCard.getSuit() + ' </span>');
                }
                else if(hand === 6){
                    // Fullhouse
                    playerDiv.append('<span>Fullhouse with the '+ highCard.getFace()  +' of ' + highCard.getSuit() + ' </span>');
                }
                else if(hand === 5){
                    // Flush
                    playerDiv.append('<span>Flush with the '+ highCard.getFace()  +' of ' + highCard.getSuit() + ' </span>');
                }
                else if(hand === 4){
                    // Straight
                    playerDiv.append('<span>Straight with the '+ highCard.getFace()  +' of ' + highCard.getSuit() + ' </span>');
                }
                else if(hand === 3){
                    // Three of a kind
                    playerDiv.append('<span>Three of a kind with the '+ highCard.getFace()  +' of ' + highCard.getSuit() + ' </span>');
                }
                else if(hand === 2){
                    // Two Pair
                    playerDiv.append('<span>Two pair with the '+ highCard.getFace()  +' of ' + highCard.getSuit() + ' </span>');
                }
                else if(hand === 1){
                    // Pair
                    playerDiv.append('<span>Pair with the '+ highCard.getFace()  +' of ' + highCard.getSuit() + ' </span>');
                }
                else{
                    // Highcard
                    playerDiv.append('<span>'+ highCard.getFace()  +' of ' + highCard.getSuit() + ' </span>');
                }
            }
        };

        this.cardComperator = function(a,b) {
          return parseInt(a.getValue(), 10) - parseInt(b.getValue(), 10);
        };

        this.hasStraight= function (stack) {
            var first5 = stack.slice(0, 5),
                sequential = true,
                lastval  = null;

            for(var i = 0; i < first5.length; i++){
                if(lastval === null){
                    lastval = first5[i].getValue();
                }
                else if((lastval + 1) !== first5[i]){
                    sequential = false;
                }
            }

            if(sequential === true)
            {
                return true;
            }
            else{
                sequential = true;
                lastval  = null;
                var middle5 = stack.slice(1,6);

                for(var j = 0; j < middle5.length; j++){
                    if(lastval === null){
                        lastval = middle5[j].getValue();
                    }
                    else if((lastval + 1) !== middle5[j]){
                        sequential = false;
                    }
                }
                if(sequential === true)
                {
                    return true;
                }
                else
                {
                    var last5 = stack.slice(2, 7);
                    sequential = true;
                    lastval  = null;
                    for(var k = 0; k < last5.length; k++){
                        if(lastval === null){
                            lastval = last5[k].getValue();
                        }
                        else if((lastval + 1) !== last5[k]){
                            sequential = false;
                        }
                    }
                    if(sequential === true)
                    {
                        return true;
                    }
                }
            }

            return false;
        };

        this.findFlush = function(stack) {
            var suits = [[], [], [], []],
                straight = this.hasStraight(stack);

            for(var i = 0; i < stack.length; i++){
                var suit = stack[i].getSuit();
                if(suit === "Hearts"){
                    suits[0].push(stack[i]);
                }
                else if(suit === "Diamonds"){
                    suits[1].push(stack[i]);
                }
                else if(suit === "Clubs"){
                    suits[2].push(stack[i]);
                }
                else if(suit === "Spades"){
                    suits[3].push(stack[i]);
                }
            }

            for(var j = 0; j < suits.length; j++){
                if(suits[j].length === 5){
                    var sequential = true,
                        lastval  = null;
                    for(var k = 0; k < suits[j].length; k++){
                        if(lastval === null){
                            lastval = suits[j][k].getValue();
                        }
                        else if((lastval + 1) !== suits[j][k].getValue()){
                            sequential = false;
                        }
                    }

                    if(sequential === true && suits[j][0].getValue() === 10){
                        return 9;
                    }
                    else if(sequential === true){
                        return 9;
                    }
                    else if(sequential !== true){
                        return 5;
                    }
                    else if(straight === true)
                    {
                        return 4;
                    }
                }
            }
        };

        this.findOccurences = function(card, stack){
            var occurences = 0;
            for (var i =0; i < stack.length; i++){
                if(card.getValue() === stack[i].getValue()){
                    occurences++;
                }
            }
            return occurences;
        };

        this.findHighestCard = function (stack){
            var highCard = null;
            for(var i = 0; i < stack.length; i++){
                var currentCard = stack[i];
                if(highCard === null){
                    highCard = currentCard;
                }
                else if(currentCard.getValue() > highCard.getValue()){
                    highCard = currentCard;
                }
             }
             return highCard;
        };
    }
    exports.logic = Logic;
});
