"use strict";

var player = {};

module.exports = function( game ) {
    var newPlayer = Object.create( player );
    newPlayer.game = game;
    return newPlayer;
};

