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
            // http://cgp.wikidot.com/circle-to-circle-collision-detection
            if ( Math.sqrt(
                ( j.pos.x - i.pos.x ) * ( j.pos.x - i.pos.x ) +
                ( j.pos.y - j.pos.y ) * ( j.pos.y - j.pos.y ) ) <
                ( i.pos.rad + j.pos.rad )
            ) {
                // Add the two items to the returned object
                collidedObjects.push( [ i, j ]);
            }
        });
    });

    // Remove the duplicates
    removeDuplicates( collidedObjects );

    return collidedObjects;
}

// Remove duplicated items like [i, j] == [j, i]
function removeDuplicates( arr ) {
    arr.forEach( function( i ) {
        arr.forEach( function( j, index ) {
            if ( i === j ) {
                return;
            }

            if (
                ( i[ 0 ] === j[ 1 ] ) && ( i[ 1 ] === j[ 0 ] )
            ) {
                // If it's a duplicate, delete the second element
                arr.splice( index, 1 );
            }
        });
    });
}

module.exports = engine;

