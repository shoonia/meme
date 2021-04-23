process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

require('../config/env');

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const { createCompiler, prepareUrls } = require('react-dev-utils/WebpackDevServerUtils');
const paths = require('../config/paths');
const configFactory = require('../config/webpack.config');

const port = 3000;
const host = '0.0.0.0';

const config = configFactory('development');
const appName = require(paths.appPackageJson).name;

const tscCompileOnError = process.env.TSC_COMPILE_ON_ERROR === 'true';
const urls = prepareUrls(
  'http',
  host,
  port,
  paths.publicUrlOrPath,
);

const devSocket = {
  warnings: (warnings) => devServer.sockWrite(devServer.sockets, 'warnings', warnings),
  errors: (errors) => devServer.sockWrite(devServer.sockets, 'errors', errors),
};

const compiler = createCompiler({
  appName,
  config,
  devSocket,
  urls,
  useYarn: false,
  useTypeScript: true,
  tscCompileOnError,
  webpack,
});

const devServer = new WebpackDevServer(compiler, {
  compress: true,
  hot: true,
  historyApiFallback: {
    disableDotRule: true,
    index: paths.publicUrlOrPath,
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
