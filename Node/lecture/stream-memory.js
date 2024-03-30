const fs = require('fs');

console.log('before:', process.memoryUsage().rss);

const readStream = fs.createReadStream('./big.txt');
const writeStream = fs.createWriteStream('./big3.txt');

// stream 방식으로 파일을 옮기는 경우에는 매우 적은 메모리를 잡아먹음
readStream.pipe(writeStream); // 파이프라인 연결
readStream.on('end', () => {
    // 끝났을 때
    console.log('stream: ', process.memoryUsage().rss);
});
