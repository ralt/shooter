"use strict";

var player = {};

module.exports = function( game ) {
    return Object.create( player, {
        game: {
            value: game
        }
    });
};

