#!/usr/bin/env node

'use strict';

// Browserify part
var fs = require( 'fs' ),
    browserify = require( 'browserify' ),
    b = browserify( {
        watch: true,
    });

b.addEntry( 'js/index.js' );

fs.writeFileSync( 'bundle.js', b.bundle() );

// Static server part
var staticServer = require( 'node-static' );

var file = new ( staticServer.Server )( '.' );

require( 'http' ).createServer( function( req, res ) {
    req.addListener( 'end', function() {
        file.serve( req, res );
    });
}).listen( 8080 );

console.log( 'Listening on port 8080' );

