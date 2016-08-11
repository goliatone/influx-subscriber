influx-subscriber:
  build: .
  command: npm start
  environment:
    - NODE_ENV={{NODE_ENV}}
    - NODE_UDP_PORT={{NODE_UDP_PORT}}
  restart: always
  log_opt:
    max-size: "500m"
    max-file: "2"
  ports:
    - "5432:5432"
    - "{{NODE_UDP_PORT}}:{{NODE_UDP_PORT}}/udp"
