const spawn = require('child_process').spawn;

const process = spawn('python3', ['test.py']); // 외부의 다른 파이썬 파일을 실행

process.stdout.on('data', function (data) {
    console.log(data.toString()); // 정상적으로 실행된다면 표준출력
});

process.stderr.on('data', function (data) {
    console.error(data.toString()); // 정상적으로 실행되지 않는다면 표준에러
});
