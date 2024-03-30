const fs = require('fs');
const zlib = require('zlib');

// read스트림과 write스트림끼리 파이프로 연결
const readStream = fs.createReadStream('./readme.txt', { highWaterMark: 16 });
const zlibStream = zlib.createGzip(); // 스트림을 사용하면 압축을 할 수 있음
const writeStream = fs.createWriteStream('./writeme4.txt.gz');
// 위와 같은 형식으로 파일을 복사할 수 있음

readStream.pipe(zlibStream).pipe(writeStream); // 미들웨어의 사용처럼 압축하는 과정을 중간에 넣을 수 있음
