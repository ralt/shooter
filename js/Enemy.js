"use strict";

var enemy = {};

module.exports = function( game ) {
    return Object.create( enemy, {
        game: {
            value: game
        }
    });
};

