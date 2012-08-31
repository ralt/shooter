"use strict";

var player = {},
    color = '#0000FF',
    startAngle = 0,
    endAngle = Math.PI*2,
    keyEvt;

/**
 * Initiliazes the player
 */
player.enter = function() {
    var ctx = this.game.ctx;

    this.pos = {
        x: 10,
        y: 10,
        rad: 10
    };
    this.dir;

    // Adds an event listener
    // But first, save the keycodes
    var keyCodes = {
        '37': 'left',
        '38': 'top',
        '39': 'right',
        '40': 'bottom',
        '32': 'space'
    };

    keyEvt = window.addEventListener( 'keydown',
        function( e ) {
        // If it's one of the keycodes
        if ( e.keyCode in keyCodes ) {
            // Do something with the player
            that.act( keyCodes[ e.keyCode ] );
        }
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
 * Chooses the action depending on the key pressed
 */
player.act = function( action ) {
    // Shoot!
    if ( action === 'space' ) {
        this.shoot();
    }
    else {
        this.move( action );
    }
};

/**
 * Moves the player
 */
player.move = function( dir ) {
    this.dir = dir;
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

