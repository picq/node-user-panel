(function() {

  'use strict';

    // Constants
    const app = require('./app');
    const debug = require('debug')('herman-express:server');
    const http = require('http');
    const port = process.env.APP_PORT || '3000';
    const host = process.env.APP_HOST || '0.0.0.0';

    const server = http.createServer(app);

    server.listen(port, host);
    server.on('listening', onListening);

    function onListening() {
      console.log(`Running on http://${host}:${port}`);
    }

}());
