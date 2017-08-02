
(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    const routes = require('../routes/index');
    const authRoutes = require('../routes/auth');

    app.use('/', routes);
    app.use('/auth', authRoutes);

  };

})(module.exports);
