const fs = require('fs');

let data = fs.readFileSync('./readme.txt'); // 동기적으로 바뀌기 때문에 콜백을 사용할 필요가 없음(프로그램적으로는 비효율적임)
console.log('1번', data.toString());

data = fs.readFileSync('./readme.txt');
console.log('2번', data.toString());

data = fs.readFileSync('./readme.txt');
console.log('3번', data.toString());

data = fs.readFileSync('./readme.txt');
console.log('4번', data.toString());
