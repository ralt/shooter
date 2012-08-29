"use strict";

var map = {},
    engine = require( './engine.js' ),
    uuid = require( 'node-uuid' ),
    nb = function( level ) {
        return ( 10 * Math.log( level + 1 ) ).toFixed( 0 );
    },
    rad = 10,
    game;

/**
 * Create the map for this level (for now, only one level)
 * For this, we choose some randomly positioned circles
 * color them in gray, and add them to the canvas and
 * to the game engine.
 */
map.create = function( level ) {
    // Define the enemies number
    this.enemiesNumber = nb( level );

    var positions = randomPos( level );

    // Complete each object now
    var objects = positions.map( function( p ) {
        return {
            name: 'map-' + level + '-' + uuid.v4(),
            pos: p
        };
    });

    // Add them to the game engine
    objects.forEach( engine.add, engine );

    // And draw'em
    objects.forEach( this.draw );
};

/**
 * Draws each position on the canvas
 */
map.draw = function( o ) {
    var ctx = game.ctx,
        pos = o.pos;

    ctx.beginPath();

    // Set the color
    ctx.fillStyle = '#AAAAAA';

    // And draw!
    ctx.arc( pos.x, pos.y, pos.rad, 0, Math.PI*2, true );

    ctx.closePath();

    ctx.fill();
};

/**
 * Generate random positions and return an array of them.
 */
function randomPos( level ) {
    var positions = [];
    for ( var i = 0; i < nb( level ); i++ ) {
        positions.push( generatePos() );
    }
    return positions;
}

/**
 * Generate a single random position
 */
function generatePos() {
    var min = 0,
        max = game.ctx.canvas.width,
        x = Math.random() * ( max - min ) + min,
        y = Math.random() * ( max - min ) + min;

    return {
        x: x,
        y: y,
        rad: rad
    };
}

module.exports = function( newGame ) {
    game = newGame;
    return Object.create( map );
};

