'use strict';
const gulp = require('gulp');
const named = require('vinyl-named');
const run = require('run-sequence');
const del = require('del');
const $ = require('gulp-load-plugins')();
$.webpack = require('webpack-stream');
const browserSync = require('browser-sync').create();
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
  run('clean', ['copy:tmp', 'webpack', 'start-server', 'watch'], done);
});
gulp.task('watch', () => {
  gulp.watch(src.css, ['postcss']);
  gulp.watch(src.test, ['test']);
  gulp.watch(src.js, ['webpack']);
});
gulp.task('build', done =>
  run('clean', ['copy:dist', 'webpack:min', 'postcss:min'], done));
gulp.task('start-server', done => run('nodemon', 'browser-sync', done));

const NODE_PORT = 8080;
gulp.task('browser-sync', done => {
  browserSync.init({
    proxy: {
      target: `localhost:${NODE_PORT}`
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


gulp.task('webpack', () => {
  return gulp.src('src/client.js')
    .pipe($.webpack(require('./webpack.config.dev')))
    .pipe(gulp.dest('.tmp/scripts'));
});

gulp.task('webpack:min', () => {
  return gulp.src('src/client.js')
    .pipe($.webpack(require('./webpack.config')))
    .pipe(gulp.dest('dist/scripts'));
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

const libs = [
  'node_modules/es6-promise/dist/es6-promise.min.js'
];
gulp.task('copy:tmp', () => gulp.src(libs).pipe(gulp.dest(tmp.lib)));
gulp.task('copy:dist', () => mergeStream(
  gulp.src(libs).pipe(gulp.dest(dist.lib)),
  gulp.src('public/**/*').pipe(gulp.dest('dist'))
));

gulp.task('clean', () => del(['.tmp', 'dist', 'lib']));
