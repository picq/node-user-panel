(function() {

  // 'use strict';
  //
  // const express = require('express')
  // const app = express();
  // const passport = require('passport');
  //
  //
  // // Constants
  // const PORT = process.env.APP_PORT;
  // const HOST = process.env.APP_HOST;
  //
  // // App
  // app.get('/', (req, res) => {
  //   res.send('Hello world\n');
  // });
  //
  // app.listen(PORT, HOST);
  // console.log(`Running on http://${HOST}:${PORT}`);


    // *** dependencies *** //
    const express = require('express');

    const appConfig = require('./config/app.js');
    const routesConfig = require('./config/routes.js');
    const errorConfig = require('./config/error.js');

    // *** express instance *** //
    const app = express();

    // *** config *** //
    appConfig.init(app, express);
    routesConfig.init(app);
    errorConfig.init(app);

    module.exports = app;

}());
