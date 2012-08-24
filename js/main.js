"use strict";

var cvs = document.getElementById( 'cvs' ),
    ctx = cvs.getContext( '2d' );

var width = 500,
    height = 500;

// Set the properties of the canvas
cvs.width = width;
cvs.height = height;

var game = require( './game.js' );

// Start a new game
game.start();

