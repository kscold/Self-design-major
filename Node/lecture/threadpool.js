const crypto = require('crypto');

const pass = 'pass';
const salt = 'salt';
const start = Date.now();

// 아래의 코드를 통해 노드js는 기본적으로 4개씩 코어를 사용하여 그룹을 지어 처리한다는 것을 알 수 있음
// 따라서 UV_THREADPOOL_SIZE=8 node threadpool의 코드로 스레드풀의 최대를 지정할 수 있음

crypto.pbkdf2(pass, salt, 1_000_000, 128, 'sha512', () => {
    console.log('1', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1_000_000, 128, 'sha512', () => {
    console.log('2', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1_000_000, 128, 'sha512', () => {
    console.log('3', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1_000_000, 128, 'sha512', () => {
    console.log('4', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1_000_000, 128, 'sha512', () => {
    console.log('5', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1_000_000, 128, 'sha512', () => {
    console.log('6', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1_000_000, 128, 'sha512', () => {
    console.log('7', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1_000_000, 128, 'sha512', () => {
    console.log('8', Date.now() - start);
});
