process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const { emptyDir, copy, writeJSON } = require('fs-extra');
const webpack = require('webpack');
const { measureFileSizesBeforeBuild, printFileSizesAfterBuild } = require('react-dev-utils/FileSizeReporter');
const axios = require('axios');

const configFactory = require('./webpack.config');
const paths = require('./paths');

const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

(async () => {
  try {
    const [previousFileSizes, list] = await Promise.all([
      measureFileSizesBeforeBuild(paths.appBuild),
      axios.get(paths.remoteDataListUrl),
    ]);

    await emptyDir(paths.appBuild);

    await Promise.all([
      copy(paths.appPublic, paths.appBuild),
      writeJSON(paths.appDataList, list.data),
    ]);

    console.log('Creating an optimized production build...\n');

    const stats = await new Promise((resolve, reject) => {
      const config = configFactory('production');

      webpack(config, (error, stats) => {
        if (error) reject(error);
        else resolve(stats);
      });
    });

    const { warnings, errors } = stats.toJson({
      all: false,
      warnings: true,
      errors: true,
    });

    if (errors.length > 0) {
      return Promise.reject(new Error(errors[0].message));
    }

    warnings.forEach((warn) => {
      console.log(warn.message, '\n');
    });

    console.log('File sizes after gzip:\n');

    printFileSizesAfterBuild(
      stats,
      previousFileSizes,
      paths.appBuild,
      WARN_AFTER_BUNDLE_GZIP_SIZE,
      WARN_AFTER_CHUNK_GZIP_SIZE
    );
  } catch (error) {
    const tscCompileOnError = process.env.TSC_COMPILE_ON_ERROR === 'true';

    if (tscCompileOnError) {
      console.log('Compiled with the following type errors\n', error);
    } else {
      console.log('Failed to compile.\n', error);
      process.exit(1);
    }
  }

  console.log();
  process.exit(0);
})();
