/*jshint esversion:6, node:true*/
/*
 * Influx Subscriber
 * https://github.com/goliatone/influx-subscriber
 *
 * Copyright (c) 2016 goliatone
 * Licensed under the MIT license.
 */
'use strict';

const degram = require('dgram');
const extend = require('gextend');
const parser = require('./parser');
const Server = require('./server');
const EventEmitter = require('events');


class Subscriber extends EventEmitter {
    constructor(config){
        super();
        config = extend({}, Subscriber.DEFAULTS, config);

        if(config.autoinitialize) this.init(config);
    }

    init(config){
        if(this.initialized) return;
        this.initialized = true;

        this.server = new Server(config.server);

        extend(this, Subscriber.DEFAULTS, config);

        this.server.on('message', (point) => this.handleMessage(point));
        this.server.start();
    }

    handleMessage(point){
        var payload = parser.lineToJSON(point);
        this.emit('point', payload);
    }
}

Subscriber.DEFAULTS = {
    autoinitialize: true
};

/**
 * Exports module
 */
module.exports = Subscriber;
