- ES5까지  [[var]] [[키워드(Keyword)]]로만 유일하게 변수를 선언할 수 있었다.
- var 키워드의 함수는 재[[할당(assignmet)]]를 할 수 있다.
## var의 단점

- var [[키워드(Keyword)]]의 여러 단점 중에서 가장 대표적인 것이 블록 레벨 스코프(block-level-scope)를 지원하지 않고 함수 레벨 스코프(function-level-scope)를 지원한다는 것이다.
- 이로 인해 의도치 않게 전역 변수가 선언되어 심각한 부작용이 발생하기도 한다.

```js
if (true) {
	var x = 3;
}
console.log(x); // 3

if (true) {
	const x = 3;
}
console.log(x); // Uncaught ReferenceError: x is not defined
```

- 즉, 위 코드처럼 var의 경우 블록 [[스코프(Scope)]]를 무시한다.

```js
funtcion a() {
	var y = 3
}

console.log(y); // Uncaught ReferenceError: y is not defined
```

- 그러나 또 var는 [[함수(Function)]] [[스코프(Scope)]]는 존중한다.
- 결과적으로 var은 현재 사용하지 않고 [[let]]과 [[const]]만 사용하면 된다.

- 위의 형태로 선언을 하면 score는 예시) 0x000000F2라는 주소의 [[undefined]](원시 값을) 가진다.