/* eslint no-var: 0, no-console: 0 */
var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config');
var portfinder = require('portfinder');

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
  },
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

function start(port) {
  app.listen(port, '0.0.0.0', function(err) {
    if (err) {
      console.log(err);
      return;
    }

    console.log('Listening at http://localhost:' + port);
  });
}

if (process.env.PORT) {
  start(process.env.PORT);
} else {
  portfinder.getPort(function(err, port) {
    if (err) return console.error(err);
    start(port);
  });
}
