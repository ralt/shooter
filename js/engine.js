"use strict";

var evt = require( './game.js' ).EventEmitter;

var engine = {};

engine.items = [];

engine.add = function( obj ) {
    this.items.[ obj.name ] = obj;
};

engine.move = function( obj ) {
    this.items[ obj.name ] = obj;

    // If there is a collision
    var objs = hasCollision();
    if ( objs.length ) {

        // Emit an event with the collided objects
        evt.emit( 'collision', objs );
    }
};

function hasCollision() {
}

module.exports = engine;

