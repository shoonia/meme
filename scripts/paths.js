const { resolve } = require('path');
const { realpathSync } = require('fs');

const appDirectory = realpathSync(process.cwd());
const resolveApp = (...relativePath) => resolve(appDirectory, ...relativePath);

process.on('unhandledRejection', (error) => {
  throw error;
});

const buildDir = 'build';
const dataListUrl = 'list.json';

module.exports = {
  appBuild: resolveApp(buildDir),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('src/index.ejs'),
  appIndexJs: resolveApp('src/index.tsx'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appTsConfig: resolveApp('tsconfig.json'),
  appNodeModules: resolveApp('node_modules'),
  appDirectory,
  publicPath: '/',

  dataListUrl,
  appDataList: resolveApp(buildDir, dataListUrl),
  remoteDataListUrl: 'https://shoonia.wixsite.com/meme-api/_functions/list',
};
