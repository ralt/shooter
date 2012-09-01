#!/usr/bin/env node

'use strict';

// Browserify part
var fs = require( 'fs' ),
    browserify = require( 'browserify' ),
    debug,
    uglify;

if ( process.argv[ 2 ] === 'debug' ) {
    debug = true;
    uglify = false;
}
else {
    debug = false;
    uglify = true;
}

var b = browserify( {
    watch: true,
    debug: debug
});

b.addEntry( 'js/index.js' );

fs.writeFileSync( 'bundle.js', b.bundle() );

// Uglify part
if ( uglify ) {
    var exec = require( 'child_process' ).exec,
        command = 'uglifyjs bundle.js > tmp.js && mv tmp.js bundle.js';

    exec( command );

    b.on( 'bundle', function() {
        exec( command );
    });
}

// Static server part
var staticServer = require( 'node-static' );

var file = new ( staticServer.Server )( '.' );

require( 'http' ).createServer( function( req, res ) {
    req.addListener( 'end', function() {
        file.serve( req, res );
    });
}).listen( 8080 );

console.log( 'Listening on port 8080' );

