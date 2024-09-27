import gulp from 'gulp';
import ts from 'gulp-typescript';
import prettier from 'gulp-prettier';
import eslint from 'gulp-eslint';

const tsProject = ts.createProject('tsconfig.json');

gulp.task('compile', function() {
    return tsProject
        .src()
        .pipe(tsProject())
        .js.pipe(gulp.dest('dist'));
});

gulp.task('prettify', () => {
    return gulp
        .src('src/**/*.ts')
        .pipe(prettier({
            singleQuote: true
        }))
        .pipe(gulp.dest('src'));
});

gulp.task('lint', () => {
    return gulp
        .src(['src/**/*.ts'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('default', gulp.series('lint', 'prettify', 'compile'))