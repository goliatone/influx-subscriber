# Influx Subscriber

Influxdb UDP subscriber

## Getting Started
Install the module with: `npm install influx-subscriber`

## Example
```js
const Subscriber = require('influx-subscriber');
const server = new Subscriber({
    server:{
        port: 9090
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

The default UDP port the server will be listening to is **9090**.

To set a custom UDP port you have two options:
- Set the `NODE_UDP_PORT` environmental variable
- Pass in a config object with `server.port` set to the port number

```js
const server = new Subscriber({
    server:{
        port: 9090
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
