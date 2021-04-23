process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

require('../config/env');

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const { createCompiler, prepareUrls } = require('react-dev-utils/WebpackDevServerUtils');
const paths = require('../config/paths');
const configFactory = require('../config/webpack.config');
const createDevServerConfig = require('../config/webpackDevServer.config');

const PORT = 3000;
const HOST = '0.0.0.0';

const config = configFactory('development');
const appName = require(paths.appPackageJson).name;

const tscCompileOnError = process.env.TSC_COMPILE_ON_ERROR === 'true';
const urls = prepareUrls(
  'http',
  HOST,
  PORT,
  paths.publicUrlOrPath.slice(0, -1)
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

const serverConfig = createDevServerConfig(urls.lanUrlForConfig, HOST);

const devServer = new WebpackDevServer(compiler, serverConfig);

devServer.listen(PORT, HOST, (error) => {
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
