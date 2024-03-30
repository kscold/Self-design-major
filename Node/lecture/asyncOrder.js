const fs = require('fs');

// 콜백지옥을 사용하여 비동기 작업이지만 이 파일 내부에서는 콜백함수를 사용하여 동기적으로 실행되도록 만듬
fs.readFile('./readme.txt', (err, data) => {
    if (err) {
        throw err;
    }
    console.log('1번', data.toString());
    fs.readFile('./readme.txt', (err, data) => {
        if (err) {
            throw err;
        }
        console.log('2번', data.toString());
        fs.readFile('./readme.txt', (err, data) => {
            if (err) {
                throw err;
            }
            console.log('3번', data.toString());
            fs.readFile('./readme.txt', (err, data) => {
                if (err) {
                    throw err;
                }
                console.log('4번', data.toString());
            });
        });
    });
});
