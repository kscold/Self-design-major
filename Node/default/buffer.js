const buffer = Buffer.from('저를 버퍼로 바꿔보세요.');
console.log(buffer);
console.log(buffer.length);
console.log(buffer.toString());

const array = [
    // 배열에 넣을 수도 있음
    Buffer.from('띄엄'),
    Buffer.from('띄엄'),
    Buffer.from('띄어쓰기'),
];
console.log(Buffer.concat(array).toString());

console.log(Buffer.alloc(5)); // alloc를 사용해서 빈 버퍼를 할당할 수도 있음
