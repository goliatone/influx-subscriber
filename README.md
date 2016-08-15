# Influx Subscriber

Influxdb UDP subscriber

## Getting Started
Install the module with: `npm install influx-subscriber`


## Development

### Influxdb
You need to create a subscription.

```
CREATE SUBSCRIPTION sub0 ON "database"."default" DESTINATIONS ALL 'udp://192.168.99.100:9090'
```

```
SHOW SUBSCRIPTIONS
```

```
DROP SUBSCRIPTION sub0 ON "database"."default"
```

Running docker instance:
```
docker run -p 8083:8083 -p 8086:8086 \
       -v $PWD:/var/lib/influxdb \
       influxdb
```

### UDP

You can run an application using docker.
-p 9090:9090/udp

## Documentation
_(Coming soon)_

## Examples

```
FROM        node:6.3.0

COPY src/package.json /tmp/package.json
RUN cd /tmp && npm install

RUN mkdir /opt/influxdb-subscriber && cp -r /tmp/node_modules /opt/influxdb-subscriber/

COPY src /opt/influxdb-subscriber

WORKDIR /opt/influxdb-subscriber

CMD ["npm", "start"]
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History


## License
Copyright (c) 2016 goliatone  
Licensed under the MIT license.
