const fs = require('fs').promises; // promise로 만듬

// 비동기로 하되 순서를 지키는 것이 동시성과 순서를 동시에 잡는 좋은 방법이다.
// Promise Chaining를 사용하여 만든 방식
fs.readFile('./readme.txt')
    .then((data) => {
        console.log('1번', data.toString());
        return fs.readFile('./readme.txt');
    })
    .then((data) => {
        console.log('2번', data.toString());
        return fs.readFile('./readme.txt');
    })
    .then((data) => {
        console.log('3번', data.toString());
        return fs.readFile('./readme.txt');
    })
    .then((data) => {
        console.log('4번', data.toString());
        return fs.readFile('./readme.txt');
    })
    .catch((err) => {
        throw err;
    });

// async await를 사용하여 만든 예시
async function main() {
    let data = await fs.readFile('./readme.txt');
    console.log('1번', data.toString());
    data = await fs.readFile('./readme.txt');
    console.log('2번', data.toString());
    data = await fs.readFile('./readme.txt');
    console.log('3번', data.toString());
    data = await fs.readFile('./readme.txt');
    console.log('4번', data.toString());
}

main();
