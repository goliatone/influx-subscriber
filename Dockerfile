FROM        node:6.3.0
MAINTAINER  goliatone <hello@goliatone.com>
LABEL       version="0.0.0"

# Set the time zone to the local time zone
RUN echo "America/New_York" > /etc/timezone && dpkg-reconfigure --frontend noninteractive tzdata

COPY src/package.json /tmp/package.json
RUN cd /tmp && npm install

RUN mkdir /opt/influxdb-subscriber && cp -r /tmp/node_modules /opt/influxdb-subscriber/

COPY src /opt/influxdb-subscriber

WORKDIR /opt/influxdb-subscriber

CMD ["npm", "start"]
