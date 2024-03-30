const fs = require('fs'); // fs 모듈이 비동기 함수임을 알 수 있음

fs.readFile('./readme.txt', (err, data) => {
    // 콜백들을 백그라운드로 넘어감으로 동시에 실행이 됨
    if (err) {
        throw err;
    }
    console.log('1번', data.toString());
});

fs.readFile('./readme.txt', (err, data) => {
    if (err) {
        throw err;
    }
    console.log('2번', data.toString());
});

fs.readFile('./readme.txt', (err, data) => {
    if (err) {
        throw err;
    }
    console.log('3번', data.toString());
});

fs.readFile('./readme.txt', (err, data) => {
    if (err) {
        throw err;
    }
    console.log('4번', data.toString());
});
