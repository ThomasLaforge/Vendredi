var gulp           = require('gulp'),
    $              = require('gulp-load-plugins')(),
    path           = require('path'),
    browserSync    = require('browser-sync'),
    through2       = require('through2'),
    reload         = browserSync.reload,
    browserify     = require('browserify'),
    del            = require('del'),
    argv           = require('yargs').argv,
    ts             = require('gulp-typescript'),
    flatten        = require('gulp-flatten');
    
var tsProject = ts.createProject("tsconfig.json");

gulp.task('browser-sync', () => {
  browserSync({
    open: !!argv.open,
    notify: !!argv.notify,
    server: {
      baseDir: "./dist"
    }
  });
});

gulp.task('compass', () => {
  return gulp.src('./src/stylesheets/**/*.{scss,sass}')
    .pipe($.plumber())
    .pipe($.compass({
      css: 'dist/stylesheets',
      sass: 'src/stylesheets'
    }))
    .on('error', () => { this.emit('end');})
    .pipe(gulp.dest('dist/stylesheets'));
});

gulp.task('ts',  ()=>  {
    // return tsProject.src()
    //     .pipe(ts(tsProject))
    //     .js.pipe(gulp.dest("dist/js"));
});

gulp.task('js', () => {
  return gulp.src('src/scripts/*.js')
    .pipe($.plumber())
    .pipe(through2.obj( (file, enc, next) => {
      browserify(file.path, { debug: true })
        .transform(require('babelify'))
        .transform(require('debowerify'))
        .bundle( (err, res) => {
          if (err) { return next(err); }
          file.contents = res;
            next(null, file);
        });
      }))
      .on('error', (error) => {
        console.log(error.stack);
        this.emit('end')
    })
  .pipe( $.rename('app.js'))
  .pipe( gulp.dest('dist/scripts/'));
});


gulp.task('clean', (cb) => {
  del('./dist', cb);
});

gulp.task('images', () => {
  return gulp.src('./src/images/**/*')
    .pipe($.imagemin({
      progressive: true
    }))
    .pipe(gulp.dest('./dist/images'))
})

gulp.task('templates', () => {
  return gulp.src('src/**/*.{html,php}')
    .pipe($.plumber())
    .pipe( gulp.dest('dist/') )
});


gulp.task('bower-files', () => {
    return gulp.src('bower_components/**/*.min.js')
    .pipe(flatten())
    .pipe(gulp.dest('dist/lib'));
});


gulp.task('build', ['compass', 'js', 'ts', 'templates', 'images', 'bower-files']);

gulp.task('serve', ['build', 'browser-sync'], () => {
  gulp.watch('src/stylesheets/**/*.{scss,sass}',['compass', reload]);
  gulp.watch('src/scripts/**/*.js',['js', reload]);
  gulp.watch('src/images/**/*',['images', reload]);
  gulp.watch('src/*.{html, php}',['templates', reload]);
  gulp.watch('src/scripts/**/*.ts', ['ts']);
});

gulp.task('default', ['serve']);
