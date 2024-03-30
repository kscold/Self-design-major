const exec = require('child_process').exec;

let process = exec('ls');
// 표준 입력을 실행

process.stdout.on('data', function (data) {
    // 표준 출력을 보여줌
    console.log(data.toString());
});

process.stderr.on('data', function (data) {
    // 표준 에러를 보여줌
    console.error(data.toString());
});
