"use strict";

var evt = require( './game.js' ).EventEmitter;

var engine = {};

engine.items = {};

engine.add = function( obj ) {
    this.items[ obj.name ] = obj;
};

engine.move = function( obj ) {
    this.add.apply( this, arguments );

    // If there is a collision
    var objs = hasCollision();
    if ( objs.length ) {

        // Emit an event with the collided objects
        evt.emit( 'collision', objs );
    }
};

// We have to check each object against the other objects
function hasCollision() {
    var collidedObjects = [],

        // Make a copy of the array of items
        items = engine.items.slice( 0 );

    // Loop through the objects
    Object.keys( items ).forEach(
        function( i ) {

        // Loop again
        Object.keys( items ).forEach(
            function( j ) {

            // Don't care if it's the same object
            if ( i === j ) {
                return;
            }

            // Check if they collide

            // First, check the x positions
            if (
                ( ( i.pos.x + i.pos.rad ) - ( j.pos.x + j.pos.rad ) )
                === 0 ) {

                // Then the y positions
                if (
                    ( ( i.pos.y + i.pos.rad ) - ( j.pos.y + j.pos.rad ) )
                === 0 ) {
                }
            }
        });
    });

    return collidedObjects;
}

module.exports = engine;

