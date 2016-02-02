'use strict';
const gulp = require('gulp');
const named = require('vinyl-named');
const run = require('run-sequence');
const del = require('del');
const $ = require('gulp-load-plugins')();
const browserSync = require('browser-sync').create();
$.webpack = require('webpack-stream');
const webpackConfig = require('./webpack.config');
const UglifyJsPlugin = require('webpack').optimize.UglifyJsPlugin;
const mergeStream = require('merge-stream');

const src = {
  js: ['src/**/*.{js,jsx}'],
  webpack: ['src/client.js'],
  css: ['src/styles/**/*.css', '!src/styles/**/_*.css', ]
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
gulp.task('watch', ['webpack:watch', 'postcss:watch', 'babel:watch']);
gulp.task('build', done => {
  run('clean', ['copy:dist', 'webpack:min', 'postcss:min'], done);
});

gulp.task('start-server', ['browser-sync', 'nodemon']);

const NODE_PORT = 8080;
gulp.task('browser-sync', done => {
  browserSync.init({
    proxy: `localhost:${NODE_PORT}`,
    files: [
      '.tmp/**/*.{js,css}',
      'dist/**/*.{js,css}',
      'public/**/*.{html,js,css,jpeg,jpg,png,gif,svg}'
    ]
  });
});

gulp.task('nodemon', ['babel'], () => {
  $.nodemon({
    script: 'bin/start-server.js',
    ext: 'js',
    ignore: [
      'gulpfile.js',
    ],
    env: { NODE_PORT }
  });
});

gulp.task('babel', () => {
  gulp.src(src.js)
    .pipe($.plumber())
    .pipe($.babel())
    .pipe(gulp.dest('lib'));
});

gulp.task('babel:watch', ['babel'], () => {
  gulp.watch(src.js, ['babel']);
});

gulp.task('webpack', () => {
  return gulp.src(src.webpack)
    .pipe(named())
    .pipe($.webpack(webpackConfig))
    .pipe(gulp.dest(tmp.js));
});

gulp.task('webpack:watch', () => {
  const config = Object.assign(webpackConfig, { watch: true });
  gulp.src(src.webpack)
    .pipe($.plumber())
    .pipe(named())
    .pipe($.webpack(config))
    .pipe(gulp.dest(tmp.js));
});

gulp.task('webpack:min', () => {
  const plugins = [new UglifyJsPlugin()];
  const devtool = false;
  const config = Object.assign(webpackConfig, { plugins, devtool });
  return gulp.src(src.webpack)
    .pipe(named())
    .pipe($.webpack(config))
    .pipe(gulp.dest(dist.js));
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

const libs = [
  'node_modules/es6-promise/dist/es6-promise.min.js'
];
gulp.task('copy:tmp', () => gulp.src(libs).pipe(gulp.dest(tmp.lib)));
gulp.task('copy:dist', () => mergeStream(
  gulp.src(libs).pipe(gulp.dest(dist.lib)),
  gulp.src('public/**/*').pipe(gulp.dest('dist'))
));

gulp.task('clean', () => del(['.tmp', 'dist', 'lib']));
