"use strict";

var player = {},
    bullet = require( './bullet.js' ),
    color = '#0000FF',
    startAngle = 0,
    endAngle = Math.PI*2,
    that,
    shootEvt,
    moveEvt;

/**
 * Initiliazes the player
 */
player.enter = function() {
    var ctx = this.game.ctx,
        that = this;

    this.pos = {
        x: 10,
        y: 10,
        rad: 10
    };
    this.dir;

    // Left click = shoot there
    shootEvt = ctx.canvas.addEventListener( 'click',
        function( e ) {
        that.shoot( e );
    }, false );

    // Right click = move to there using the A* algorithm
    moveEvt = ctx.canvas.addEventListener( 'contextmenu',
        function( e ) {
        that.move( e );
    }, false );

    // And draw the first player
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc( pos.x, pos.x, pos.rad, startAngle, endAngle, true );
    ctx.closePath();
    ctx.fill();

    // Then draw at each frame
    this.draw();
};

/**
 * Moves the player
 */
player.move = function( e ) {
    // Use the A* algorithm to know where the player is going
};

/**
 * Shoots a bullet
 */
player.shoot = function( e ) {
    // Spawn a new bullet and shoot it
    var newBullet = bullet( this.game );
    newBullet.shoot( e );
};

/**
 * Draws the player at each frame
 */
player.draw = function() {
};

module.exports = function( game ) {
    return Object.create( player, {
        game: {
            value: game
        }
    });
};

