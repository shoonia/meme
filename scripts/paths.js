const { resolve } = require('path');
const { realpathSync } = require('fs');

const appDirectory = realpathSync(process.cwd());
const resolveApp = (relativePath) => resolve(appDirectory, relativePath);

process.on('unhandledRejection', (error) => {
  throw error;
});

module.exports = {
  appPath: resolveApp('.'),
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('src/index.ejs'),
  appIndexJs: resolveApp('src/index.tsx'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appTsConfig: resolveApp('tsconfig.json'),
  appNodeModules: resolveApp('node_modules'),
  publicPath: '/',
  appDirectory,
};
