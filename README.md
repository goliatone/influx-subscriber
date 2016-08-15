# Influx Subscriber

Influxdb UDP subscriber

## Getting Started
Install the module with: `npm install influx-subscriber`

## Example
```js
const Subscriber = require('influx-subscriber');
const server = new Subscriber();

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


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* 2016-08-15 v.0.1.0: Initial release

## License
Copyright (c) 2016 goliatone  
Licensed under the MIT license.
