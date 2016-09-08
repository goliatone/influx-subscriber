# Influx Subscriber

Influxdb UDP subscriber

## Getting Started
Install the module with: `npm install influx-subscriber`

## Example
```js
const Subscriber = require('influx-subscriber');
const server = new Subscriber({
    server:{
        port: 9090,
        options: {
            reuseAddr: true
        }
    }
});

server.on('point', (point) => {
    var measurement = point.measurement;
    if(measurement.match(/^access_granted\.global_unique\.1d$/)){
        persist(point);
    }
});

function persist(point){
    // { timestamp: 1470934800000000000,
    //   measurement: 'access_granted.global_unique.1h',
    //   fields: [ { members: 290 } ],
    //   tags: [] }
}
```

## Documentation

### Configuration

Under the hood, a Subscriber will use a [dgram][dgram] instance to create the UDP connection.
In the configuration object, under the `server` key, you can pass the following values:
- `port`
- `bind`

To get more details on what those do, read the documentation.

There is a default port `9090` that will be used if not overriden with a configuration object. If a `bind` object is found then it will be used instead of the `port`.

#### port
The default UDP port the server will be listening to is **9090**.

To set a custom UDP port you have two options:
- Set the `NODE_UDP_PORT` environmental variable
- Pass in a config object with `server.port` set to the port number

```js
const server = new Subscriber({
    server: {
        port: 9090
    }
});
```

### bind

* port <Number> - Integer, Optional
* address <String>, Optional
* callback <Function> with no parameters, Optional. Called when binding is complete.

```js
const server = new Subscriber({
    server: {
        bind: {
            address: 'localhost',
            port: 8000,
            exclusive: true
        }
    }
});
```

#### options
As the `options` field goes straight to `dgram.createSocket` you can pass either a String with a type, or an object. Read more [here][dgram-createSocket].


* type
* reuseAddr

```js
const server = new Subscriber({
    server: {
        options: {
            type: 'udp4',
            reuseAddr: true
        }
    }
});
```

### InfluxDB setup

You need to register a new subscriber in your InfluxDB instance, you do so by running a [create subscription][docs-1] query:

```sql
CREATE SUBSCRIPTION influx_subscriber ON "mydb"."default" DESTINATIONS ALL 'udp://yourapp.com:9090'
```

You can then drop and show subscriptions.

```sql
SHOW SUBSCRIPTIONS
```

```sql
DROP SUBSCRIPTION sub0 ON "mydb"."default"
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* 2016-08-15 v.0.1.0: Initial release

## License
Copyright (c) 2016 goliatone  
Licensed under the MIT license.


[docs-1]:https://docs.influxdata.com/influxdb/v0.13/query_language/spec/#create-subscription
[dgram]:https://nodejs.org/api/dgram.html
[dgram-createSocket]:https://nodejs.org/api/dgram.html#dgram_dgram_createsocket_options_callback
