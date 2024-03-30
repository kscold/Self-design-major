const fs = require('fs').promises;

fs.writeFile('./writeme.txt', '글이 입력됩니다.') // fs 모듈로 파일을 생성할 때 사용하는 방벙
    .then(() => {
        return fs.readFile('./writeme.txt'); // 다시 읽어서
    })
    .then((data) => {
        console.log(data.toString()); // console에 출력
    })
    .catch((err) => {
        throw err;
    });
