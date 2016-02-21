'use strict';
const gulp = require('gulp');
const named = require('vinyl-named');
const run = require('run-sequence');
const del = require('del');
const $ = require('gulp-load-plugins')();
const browserSync = require('browser-sync').create();
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const mergeStream = require('merge-stream');

const src = {
  js: ['src/**/*.{js,jsx}'],
  webpack: ['src/client.js'],
  css: ['src/styles/**/*.css', '!src/styles/**/_*.css', ],
  test: ['test/**/*.js']
};
const tmp = {
  js: '.tmp/scripts',
  css: '.tmp/styles',
  lib: '.tmp/lib'
};
const dist = {
  js: 'dist/scripts',
  css: 'dist/styles',
  lib: 'dist/lib'
};

gulp.task('default', ['start']);
gulp.task('start', done => {
  run('clean', ['copy:tmp', 'start-server', 'watch'], done);
});
gulp.task('watch', [
  'postcss:watch',
  'test:watch'
]);
gulp.task('build', done =>
  run('clean', ['copy:dist', 'webpack:min', 'postcss:min'], done));
gulp.task('start-server', done => run('nodemon', 'browser-sync', done));

const NODE_PORT = 8080;
gulp.task('browser-sync', done => {
  const webpackConfig = require('./webpack.config.dev');
  const bundler = webpack(webpackConfig);

  browserSync.init({
    proxy: {
      target: `localhost:${NODE_PORT}`,
      middleware: [
        webpackDevMiddleware(bundler, {
          publicPath: webpackConfig.output.publicPath,
          stats: {
            colors: true,
            hash: true,
            chunks: false
          }
        }),
        webpackHotMiddleware(bundler)
      ]
    },
    files: [
      '.tmp/**/*.{js,css}',
      'dist/**/*.{js,css}',
      'public/**/*.{html,js,css,jpeg,jpg,png,gif,svg}'
    ]
  });
});

gulp.task('nodemon', done => {
  $.nodemon({
    script: 'bin/start-server.js',
    ext: 'js jsx',
    ignore: [
      'gulpfile.js',
      'node_modules/'
    ],
    env: { NODE_PORT, NODE_EVN: 'development' }
  }).on('start', () => {
    if (done) {
      done();
      done = false;
    }
  });
});

gulp.task('webpack:min', done => {
  const webpackConfig = require('./webpack.config');
  webpack(webpackConfig, (err, stats) => {
    if(err) {
      throw new $.util.PluginError("webpack", err);
    }
    $.util.log('[webpack]', stats.toString({
      colors: true,
      hash: true,
      chunks: false
    }));
    done();
  });
});

gulp.task('postcss', () => {
  const plugins = [
    require('autoprefixer'),
    require('precss')
  ];
  return gulp.src(src.css)
    .pipe($.sourcemaps.init())
    .pipe($.postcss(plugins))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(tmp.css));
});

gulp.task('postcss:watch', ['postcss'], () => {
  gulp.watch(src.css, ['postcss']);
});

gulp.task('postcss:min', () => {
  const plugins = [
    require('autoprefixer'),
    require('precss'),
    require('cssnano')
  ];
  return gulp.src(src.css)
    .pipe($.postcss(plugins))
    .pipe(gulp.dest(dist.css));
});

gulp.task('test', () => gulp.src(src.test).pipe($.ava()));
gulp.task('test:watch', () => gulp.watch(src.test, ['test']));

const libs = [
  'node_modules/es6-promise/dist/es6-promise.min.js'
];
gulp.task('copy:tmp', () => gulp.src(libs).pipe(gulp.dest(tmp.lib)));
gulp.task('copy:dist', () => mergeStream(
  gulp.src(libs).pipe(gulp.dest(dist.lib)),
  gulp.src('public/**/*').pipe(gulp.dest('dist'))
));

gulp.task('clean', () => del(['.tmp', 'dist', 'lib']));
