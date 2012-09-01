'use strict';

var bullet = {};

bullet.shoot = function( e ) {
    // Use a vector based way to move the bullet:
    // http://gamedev.stackexchange.com/a/35342/13584
};

module.exports = function( game ) {
    return Object.create( bullet, {
        game: {
            value: game
        }
    });
};

