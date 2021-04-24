const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const createLocalIdent = require('mini-css-class-name/css-loader');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const paths = require('./paths');
const pkg = require(paths.appPackageJson);

const webpackDevClientEntry = require.resolve(
  'react-dev-utils/webpackHotDevClient'
);

const reactRefreshOverlayEntry = require.resolve(
  'react-dev-utils/refreshOverlayInterop'
);

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;

module.exports = (webpackEnv) => {
  const isDev = webpackEnv === 'development';
  const isProd = webpackEnv === 'production';

  const getStyleLoaders = (cssOptions) => [
    isDev && require.resolve('style-loader'),
    isProd && MiniCssExtractPlugin.loader,
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        plugins: () => [
          require('postcss-preset-env')({
            autoprefixer: {
              flexbox: 'no-2009',
            },
          }),
        ],
        sourceMap: isDev,
      },
    },
  ].filter(Boolean);

  return {
    mode: webpackEnv,
    bail: isProd,
    devtool: isDev && 'cheap-module-source-map',
    entry: [
      isDev && webpackDevClientEntry,
      paths.appIndexJs,
    ].filter(Boolean),
    output: {
      path: isProd ? paths.appBuild : undefined,
      pathinfo: isDev,
      filename: 'static/js/[name].[contenthash:4].js',
      chunkFilename: 'static/js/[name].[id].[contenthash:4].chunk.js',
      publicPath: paths.publicPath,
      devtoolModuleFilenameTemplate: isProd
        ? (info) => path.relative(paths.appSrc, info.absoluteResourcePath).replace(/\\/g, '/')
        : (info) => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
      chunkLoadingGlobal: 'J',
      globalObject: 'this',
    },
    optimization: {
      minimize: isProd,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            ecma: 2020,
            module: true,
            toplevel: true,
            parse: {
              ecma: 2018,
            },
            compress: {
              ecma: 2018,
              module: true,
              comparisons: false,
              inline: 2,
              drop_console: true,
              passes: 3,
              toplevel: true,
              pure_getters: true,
            },
            output: {
              ecma: 2018,
              comments: false,
            },
          },
        }),
        new CssMinimizerPlugin({
          minimizerOptions: {
            preset: [
              'default',
              {
                discardComments: {
                  removeAll: true,
                  removeAllButFirst: true,
                },
              },
            ],
          },
        }),
      ],
      splitChunks: {
        chunks: 'all',
      },
    },
    resolve: {
      modules: [
        'node_modules',
        paths.appNodeModules
      ],
      extensions: [
        '.js',
        '.ts',
        '.tsx',
        '.json',
      ],
      alias: {},
    },
    module: {
      strictExportPresence: true,
      rules: [
        { parser: { requireEnsure: false } },
        {
          oneOf: [
            // "url" loader works like "file" loader except that it embeds assets
            // smaller than specified limit in bytes as data URLs to avoid requests.
            // A missing `test` is equivalent to a match.
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              loader: require.resolve('url-loader'),
              options: {
                limit: 10000,
                name: 'static/media/[name].[hash:4].[ext]',
              },
            },
            {
              test: /\.(js|ts|tsx)$/,
              include: paths.appSrc,
              loader: require.resolve('babel-loader'),
              options: {
                presets: [
                  '@babel/preset-typescript',
                  [
                    '@babel/preset-env',
                    {
                      loose: true,
                      browserslistEnv: webpackEnv,
                      configPath: paths.appDirectory,
                      useBuiltIns: 'entry',
                    },
                  ],
                  [
                    '@babel/preset-react',
                    {
                      runtime: 'automatic',
                    },
                  ],
                ],
                plugins: [
                  isDev && require.resolve('react-refresh/babel'),
                  [
                    'babel-plugin-const-enum',
                    {
                      transform: 'constObject',
                    },
                  ],
                ].filter(Boolean),
                cacheDirectory: true,
                cacheCompression: false,
                compact: isProd,
              },
            },
            {
              test: cssRegex,
              exclude: cssModuleRegex,
              use: getStyleLoaders({
                importLoaders: 1,
                sourceMap: isDev,
              }),
              // Don't consider CSS imports dead code even if the
              // containing package claims to have no side effects.
              // Remove this when webpack adds a warning or an error for this.
              // See https://github.com/webpack/webpack/issues/6571
              sideEffects: true,
            },
            {
              test: cssModuleRegex,
              use: getStyleLoaders({
                importLoaders: 1,
                sourceMap: isDev,
                modules: isDev ? {
                  localIdentName: '[name]_[local]',
                } : {
                  getLocalIdent: createLocalIdent(),
                },
              }),
            },
            {
              loader: require.resolve('file-loader'),
              exclude: [/\.(js|ts|tsx)$/, /\.html$/, /\.json$/, /\.ejs$/],
              options: {
                name: 'static/media/[name].[hash:4].[ext]',
              },
            },
            // ** STOP ** Are you adding a new loader?
            // Make sure to add the new loader(s) before the "file" loader.
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        inject: 'head',
        scriptLoading: 'defer',
        template: paths.appHtml,
        minify: isProd && {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
        templateParameters: {
          homepage: pkg.homepage,
          isProd,
        },
      }),
      new webpack.DefinePlugin({
        'process.platform': JSON.stringify(process.platform),
        'process.env.NODE_ENV': JSON.stringify(webpackEnv),
        'process.env.NODE_DEBUG': JSON.stringify(isDev),
        'process.env': '({})',
        'process.throwDeprecation': 'false',
        'process.noDeprecation': 'false',
        'process.emitWarning': 'undefined',
        'process': 'undefined',
      }),
      isDev && new webpack.HotModuleReplacementPlugin(),
      isDev && new ReactRefreshWebpackPlugin({
        overlay: {
          entry: webpackDevClientEntry,
          module: reactRefreshOverlayEntry,
          sockIntegration: false,
        },
      }),
      isProd && new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:4].css',
        chunkFilename: 'static/css/[name].[contenthash:4].chunk.css',
      }),
      // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          configFile: paths.appTsConfig,
        },
      }),
      new ESLintPlugin({
        extensions: ['js', 'ts', 'tsx'],
        eslintPath: require.resolve('eslint'),
        failOnError: isProd,
        context: paths.appSrc,
        cache: true,
        cacheLocation: path.resolve(paths.appNodeModules, '.cache/.eslintcache'),
        cwd: paths.appDirectory,
        resolvePluginsRelativeTo: __dirname,
      }),
    ].filter(Boolean),
    performance: false,
  };
};
