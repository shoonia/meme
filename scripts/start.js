process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const paths = require('./paths');
const configFactory = require('./webpack.config');

const port = 3000;
const host = '0.0.0.0';

const config = configFactory('development');
const compiler = webpack(config);

const devServer = new WebpackDevServer(compiler, {
  compress: true,
  hot: true,
  historyApiFallback: {
    disableDotRule: true,
    index: paths.publicPath,
  },
  host,
  port,
  public: host,
  static: paths.appPublic,
  transportMode: 'ws',
});

devServer.listen(port, host, (error) => {
  if (error) {
    return console.log(error);
  }

  console.log('Starting the development server...\n');
});

['SIGINT', 'SIGTERM'].forEach((sig) => {
  process.on(sig, () => {
    devServer.close();
    process.exit();
  });
});
