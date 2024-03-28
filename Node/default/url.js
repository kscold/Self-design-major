const url = require('url'); // 현재 줄과

const { URL } = url; // 이 줄이 없이 URL 객체를 실행시켜도 내장객체기 때문에 실행이 됨
const myURL = new URL(
    'http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor'
);

console.log('new URL():', myURL);
console.log('url.format():', url.format(myURL));
