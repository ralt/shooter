"use strict";

var map = {};

module.exports = function( game ) {
    var newMap = Object.create( map );
    newMap.game = game;
    return newMap;
};

