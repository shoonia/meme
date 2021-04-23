const path = require('path');
const webpack = require('webpack');
const resolve = require('resolve');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('react-dev-utils/ForkTsCheckerWebpackPlugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const paths = require('./paths');
const getClientEnvironment = require('./env');

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

  const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1));

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
    entry:
      isDev
        ? [
          // Include an alternative client for WebpackDevServer. A client's job is to
          // connect to WebpackDevServer by a socket and get notified about changes.
          // When you save a file, the client will either apply hot updates (in case
          // of CSS changes), or refresh the page (in case of JS changes). When you
          // make a syntax error, this client will display a syntax error overlay.
          // Note: instead of the default WebpackDevServer client, we use a custom one
          // to bring better experience for Create React App users. You can replace
          // the line below with these two lines if you prefer the stock client:
          //
          // require.resolve('webpack-dev-server/client') + '?/',
          // require.resolve('webpack/hot/dev-server'),
          //
          // When using the experimental react-refresh integration,
          // the webpack plugin takes care of injecting the dev client for us.
          webpackDevClientEntry,
          // Finally, this is your app's code:
          paths.appIndexJs,
          // We include the app code last so that if there is a runtime error during
          // initialization, it doesn't blow up the WebpackDevServer client, and
          // changing JS code would still trigger a refresh.
        ]
        : paths.appIndexJs,
    output: {
      path: isProd ? paths.appBuild : undefined,
      pathinfo: isDev,
      filename: 'static/js/[name].[contenthash:4].js',
      chunkFilename: 'static/js/[name].[id].[contenthash:4].chunk.js',
      publicPath: paths.publicUrlOrPath,
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
      // Keep the runtime chunk separated to enable long term caching
      // https://twitter.com/wSokra/status/969679223278505985
      // https://github.com/facebook/create-react-app/issues/5358
      runtimeChunk: {
        name: entrypoint => `runtime-${entrypoint.name}`,
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
        // Disable require.ensure as it's not a standard language feature.
        { parser: { requireEnsure: false } },
        {
          // "oneOf" will traverse all following loaders until one will
          // match the requirements. When no loader matches it will fall
          // back to the "file" loader at the end of the loader list.
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
                customize: require.resolve(
                  'babel-preset-react-app/webpack-overrides'
                ),
                presets: [
                  [
                    require.resolve('babel-preset-react-app'),
                    {
                      runtime: 'automatic',
                    },
                  ],
                ],
                plugins: [
                  isDev && require.resolve('react-refresh/babel'),
                ].filter(Boolean),
                // This is a feature of `babel-loader` for webpack (not Babel itself).
                // It enables caching results in ./node_modules/.cache/babel-loader/
                // directory for faster rebuilds.
                cacheDirectory: true,
                // See #6846 for context on why cacheCompression is disabled
                cacheCompression: false,
                compact: isProd,
              },
            },
            // Process any JS outside of the app with Babel.
            // Unlike the application JS, we only compile the standard ES features.
            {
              test: /\.js$/,
              exclude: /@babel(?:\/|\\{1,2})runtime/,
              loader: require.resolve('babel-loader'),
              options: {
                babelrc: false,
                configFile: false,
                compact: false,
                presets: [
                  [
                    require.resolve('babel-preset-react-app/dependencies'),
                    { helpers: true },
                  ],
                ],
                cacheDirectory: true,
                // See #6846 for context on why cacheCompression is disabled
                cacheCompression: false,

                // Babel sourcemaps are needed for debugging into node_modules
                // code.  Without the options below, debuggers like VSCode
                // show incorrect code and set breakpoints on the wrong lines.
                sourceMaps: isDev,
                inputSourceMap: isDev,
              },
            },
            // "postcss" loader applies autoprefixer to our CSS.
            // "css" loader resolves paths in CSS and adds assets as dependencies.
            // "style" loader turns CSS into JS modules that inject <style> tags.
            // In production, we use MiniCSSExtractPlugin to extract that CSS
            // to a file, but in development "style" loader enables hot editing
            // of CSS.
            // By default we support CSS Modules with the extension .module.css
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
            // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
            // using the extension .module.css
            {
              test: cssModuleRegex,
              use: getStyleLoaders({
                importLoaders: 1,
                sourceMap: isDev,
                modules: {
                  localIdentName: '[name]_[local]',
                },
              }),
            },
            // "file" loader makes sure those assets get served by WebpackDevServer.
            // When you `import` an asset, you get its (virtual) filename.
            // In production, they would get copied to the `build` folder.
            // This loader doesn't use a "test" so it will catch all modules
            // that fall through the other loaders.
            {
              loader: require.resolve('file-loader'),
              // Exclude `js` files to keep "css" loader working as it injects
              // its runtime that would otherwise be processed through "file" loader.
              // Also exclude `html` and `json` extensions so they get processed
              // by webpacks internal loaders.
              exclude: [/\.(js|ts|tsx)$/, /\.html$/, /\.json$/],
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
        inject: true,
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
      }),
      isProd && new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime-.+[.]js/]),
      // Makes some environment variables available in index.html.
      // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
      // <link rel="icon" href="%PUBLIC_URL%/favicon.ico">
      // It will be an empty string unless you specify "homepage"
      // in `package.json`, in which case it will be the pathname of that URL.
      new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
      // Makes some environment variables available to the JS code, for example:
      // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
      // It is absolutely essential that NODE_ENV is set to production
      // during a production build.
      // Otherwise React will be compiled in the very slow development mode.
      new webpack.DefinePlugin(env.stringified),
      // This is necessary to emit hot updates (CSS and Fast Refresh):
      isDev && new webpack.HotModuleReplacementPlugin(),
      // Experimental hot reloading for React .
      // https://github.com/facebook/react/tree/master/packages/react-refresh
      isDev && new ReactRefreshWebpackPlugin({
        overlay: {
          entry: webpackDevClientEntry,
          // The expected exports are slightly different from what the overlay exports,
          // so an interop is included here to enable feedback on module-level errors.
          module: reactRefreshOverlayEntry,
          // Since we ship a custom dev client and overlay integration,
          // the bundled socket handling logic can be eliminated.
          sockIntegration: false,
        },
      }),
      isProd && new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:4].css',
        chunkFilename: 'static/css/[name].[contenthash:4].chunk.css',
      }),
      // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new ForkTsCheckerWebpackPlugin({
        typescript: resolve.sync('typescript', {
          basedir: paths.appNodeModules,
        }),
        async: isDev,
        checkSyntacticErrors: true,
        tsconfig: paths.appTsConfig,
        reportFiles: [
          '../**/src/**/*.{ts,tsx}',
          '**/src/**/*.{ts,tsx}',
        ],
        silent: true,
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
