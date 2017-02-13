var browserslist = require('..');

[
    { file: './perf/one/app/css/hello.css', n: 3000 },
    { file: './perf/two/app/js/hello.js', n: 3000 },
    { file: './perf/three/app/js/hello.js', n: 3000 }
].forEach(function (test) {
    for (var i = 0; i < test.n; i++) {
        browserslist.findConfig(test.file);
    }
});
