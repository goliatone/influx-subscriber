# Influx Subscriber

Influxdb UDP subscriber

## Getting Started
Install the module with: `npm install influx-subscriber`


## Development

### Influxdb
You need to create a subscription.

```
CREATE SUBSCRIPTION sub0 ON "s2_staging"."default" DESTINATIONS ALL 'udp://192.168.99.100:9090'
```

```
SHOW SUBSCRIPTIONS
```

```
DROP SUBSCRIPTION sub0 ON "s2_staging"."default"
```

Running docker instance:
```
docker run -p 8083:8083 -p 8086:8086 \
       -v $PWD:/var/lib/influxdb \
       influxdb
```

### UDP



-p 9090:9090/udp

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2016 goliatone  
Licensed under the MIT license.
