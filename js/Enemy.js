"use strict";

var enemy = {};

module.exports = function( game ) {
    var newEnemy = Object.create( enemy );
    newEnemy.game = game;
    return newEnemy;
};

