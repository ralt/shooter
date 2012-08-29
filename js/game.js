"use strict";

var EventEmitter = require( 'events' ).EventEmitter,
    game = new EventEmitter(),
    Map = require( './Map.js' ),
    Player = require( './Player.js' ),
    Enemy = require( './Enemy.js' );

game.start = function( ctx ) {
    this.ctx = ctx;

    // Get the first level map
    var map = Map( this );

    // And create it
    this.level = this.level++ || 1;
    map.create( this.level );

    // Spawn a new player
    var player = Player( this );

    // Spawn enemies
    var enemies = [];
    for ( var i = 0; i < map.enemiesNumber; i++ ) {
        enemies.push( Enemy( this ) );
    }

    // The algorithm to add the new enemies to the map is simple:
    //   - Have a long timeout, and add an enemy at each timeout
    //   - Then decrease the timeout every time
    //
    // This way, enemies come in quicker and quicker.
    function buildEnemy() {
        enemies.pop().enter();
    }
};

module.exports = game;

