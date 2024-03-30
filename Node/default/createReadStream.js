const fs = require('fs');
const readStream = fs.createReadStream('./readme3.txt', { highWaterMark: 16 }); // 스트림 별로 조각 내서 읽음, 그러나 기본적으로 64kb를 한번에 읽기 때문에 16byte로 쪼개개 설정함

// 따라서 대용량 파일 서버를 이용할 때 필수적

const data = [];
readStream.on('data', (chunk) => {
    data.push(chunk);
    console.log('data:', chunk, chunk.length);
});

readStream.on('end', () => {
    console.log('end:', Buffer.concat(data).toString());
});

readStream.on('error', (err) => {
    console.log('error:', err);
});
