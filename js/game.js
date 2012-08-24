"use strict";

var game = {},
    EventEmitter = require( 'events' ).EventEmitter,
    Map = require( './Map.js' ),
    Player = require( './Player.js' ),
    Enemy = require( './Enemy.js' );

game.start = function( ctx ) {
    this.ctx = ctx;

    // Get the first level map
    var map = new Map( this );

    // Spawn a new player
    var player = new Player( this );

    // Spawn enemies
    var enemies = [];
    map.enemiesNumber.forEach( function() {
        enemies.push( new Enemy( this ) );
    });

    // The algorithm to add the new enemies to the map is simple:
    //   - Have a long timeout, and add an enemy at each timeout
    //   - Then decrease the timeout every time
    //
    // This way, enemies come in quicker and quicker.
    function buildEnemy() {
        enemies.pop().enter();
    }

    while( --map.enemiesNumber ) {
        setTimeout( buildEnemy, --map.timeout );
    }
};

// Create an event object for the game
module.exports.EventEmitter = new EventEmitter();

module.exports = game;

