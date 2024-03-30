// 콜백함수로 사용하는 방법
const fs = require('fs');

fs.readFile('./readme.txt', (err, data) => {
    // 노드의 콜백은 기본적으로 err가 먼저 할당됨
    if (err) {
        throw err;
    }

    console.log(data); // 그냥 데이터를 출력하면 이진법으로 표현하기 때문에
    console.log(data.toString()); // ToString()를 통해 문자열로 변환
});

// Promise로 사용하는 방법(똑같은 결과가 나옴)
const fs = require('fs').promises;

fs.readFile('./readme.txt')
    .then((data) => {
        console.log(data); // 그냥 데이터를 출력하면 이진법으로 표현하기 때문에
        console.log(data.toString()); // ToString()를 통해 문자열로 변환
    })
    .catch((err) => {
        throw err;
    });
