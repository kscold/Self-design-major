const fs = require('fs');

console.log('before:', process.memoryUsage().rss); // 메모리를 측정할 수 있는 기능

// buffer 방식으로 파일을 옮기는 경우에는 파일사이즈 이상 만큼의 메모리를 잡아먹음
const data1 = fs.readFileSync('./big.txt');
fs.writeFileSync('./big2.txt', data1);

console.log('buffer: ', process.memoryUsage().rss);
