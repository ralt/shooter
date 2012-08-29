#!/usr/bin/env node
/**
 * Script taken here:
 * https://github.com/Raynos/fyp/blob/master/src/build.js
 */
var path = require("path"),
    child_process = require("child_process"),
    fs = require("fs"),
    uuid = require( 'node-uuid' ),
    clientModules = path.join(__dirname, "js")

function readFiles(dir) {
    fs.readdir(dir, function (err, files) {
        //console.log("reading files", files)
        files.forEach(function (file) {
            file = path.join(dir, file)
            fs.stat(file, function (err, stat) {
                if (err) {
                    console.log(err)
                }
                if (stat.isDirectory()) {
                    readFiles(file)
                } else if (stat.isFile()) {
                    fs.watchFile(file, build)
                }
            })
        })
    })
}

function build() {
    var command = "browserify -e js/index.js -o bundle.js";
    child_process.exec( command,
        function( err, stdout, stderr ) {
        if ( err ) {
            console.error( err );
        }
        else {
            console.log( 'Rebuild #' + uuid.v4() );
        }
    });
}

// Build a static server for this folder.
var static = require( 'node-static' );

var file = new ( static.Server )( '.' );

require( 'http' ).createServer( function( req, res ) {
    req.addListener( 'end', function() {
        file.serve( req, res );
    });
}).listen( 8080 );
console.log( 'Listening on port 8080' );

readFiles(clientModules)
build()
