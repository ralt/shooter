"use strict";

var map = {};

module.exports = function( game ) {
    return Object.create( map, {
        game: {
            value: game
        }
    });
};

