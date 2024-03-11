- [[노드(Node.js)]]는 [[모듈(Module)]]의 특성을 이용하여 module.export [[메서드(Method)]]를 통해 다른 파일에서 [[객체(Object)]]를 사용할 수 있게 해준다.
- [[객체(Object)]]를 module.exports() 했다면 다른 파일에서 [[require()]]하여 사용하면 된다.

- module.export는 [[노드(Node.js)]]가 만들어낸 [[속성(Property)]]인데 빈 [[객체(Object)]](`{}`)가 대입되어 있다.

- exports() [[메서드(Method)]]도 존재하는데 단순히 module.exports()와 같은 역할을 하는 별칭이다.
- [[객체(Object)]] 형식이나 [[배열(Array)]] 형식으로 넘겨줄 수 있다.

- 다른 파일에서 받은 [[객체(Object)]]를 또 다시 넘겨줄 수 있으나, 주의해야할 점은 파일당 한번만 module.exports() [[메서드(Method)]]를 사용할 수 있다.
 

## 객체를 module.exports() 하기

```js
// var.js
const odd = '홀수입니다.';
const even = '홀수입니다.';

module.exports = { // 다른 파일에서 쓸 수 있도록 설정 및 shorthand property 적용
	odd,
	even,
}

// func.js
const { odd, even } = require('./var');

function checkOddOrEven(number) {
	if (number % 2) {
		return odd;
	} else {
		return even;
	}
}

module.exports = checkOddOrEven;
```

## exports.객체 형식으로 사용

- `module.exports === exports === {}`의 관계가 유지되어 있다면 exports.객체 형식으로 바꿔서 사용해도 가능하다.
- 그러나 module.exports에 [[함수(Function)]]([[메서드(Method)]])가 수출되면 exports 와 참조가 관계가 끊기므로(`!==`) 이 부분에 대해서 조심해야 한다.

- 또한 한 파일 안에 exports.객체 형식을 사용하는 순간부터는 module.exports 형식을 사용할 수 없다.

```js
const odd = '홀수입니다.';
const even = '홀수입니다.';

exports.odd = odd;
exports.even = even;
```
