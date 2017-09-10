/*jshint esversion:6, node:true*/
'use strict';

const dgram = require('dgram');
const extend = require('gextend');
const EventEmitter = require('events');
const debug = require('debug')('socket');

class Server extends EventEmitter {

    constructor(options){
        super();

        options = extend({}, Server.DEFAULTS, options);

        if(options.autoinitialize) this.init(options);
    }

    init(config){
        if(this.initialized) return;
        this.initialized = true;

        extend(this, Server.DEFAULTS, config);
        
        this.socket = dgram.createSocket(this.options);
        this.addListeners();
    }

    addListeners(){

        this.socket.on('message', (point, info) => {
            this.emit('message', point);
        });

        this.socket.on('listening', () => {
            var address = this.socket.address();
            debug('listening ' + address.address + ':' + address.port);
        });

        this.socket.on('error', function(err){
            console.error(err);
            process.exit(0);
        });
    }

    start(){
        this.socket.bind(this.bind || this.port);
    }

    get port(){
        return this._port;
    }

    set port(p){
        if(typeof p === 'string') p = parseInt(p);
        this._port = p;
    }
}

Server.DEFAULTS = {
    autoinitialize: true,
    port: process.env.NODE_UDP_PORT || 9090,
    options: {
        type: 'udp4',
        reuseAddr: false
    }
};

module.exports = Server;
