'use strict';

var dgram = require('dgram');

//Initialize a UDP server to listen for json payloads on port 3333
var srv = dgram.createSocket('udp4');
srv.on('message', function (msg, rinfo) {
    // console.log('UDP: ' + msg + ' from ' + rinfo.address + ':' + rinfo.port);
    var point = require('./parser').lineToJSON(msg);
    console.log(point);
});

srv.on('listening', function () {
    var address = srv.address();
    console.log('server listening ' + address.address + ':' + address.port);
});

srv.on('error', function (err) {
    console.error(err);
    process.exit(0);
});

srv.bind(getPort());

function getPort(port=9090){
    if(!process.env.NODE_UDP_PORT) return port;
    return parseInt(process.env.NODE_UDP_PORT);
}
