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
const EventEmitter = require('events');


class Subscriber extends EventEmitter{
    constructor(config){
        super();
        config = extend({}, this.constructor.DEFAULTS, config);

        if(config.autoinitialize) this.init(config);
    }

    init(config){
        if(this.initialized) return;
        this.initialized = true;

        extend(this, this.constructor.DEFAULTS, config);
    }
}

Subscriber.DEFAULTS = {
    autoinitialize: true
};

/**
 * Exports module
 */
module.exports = Subscriber;
