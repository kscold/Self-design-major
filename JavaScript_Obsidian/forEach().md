- [[for]]문의 for ... of와 같이 주로 [[배열(Array)]]에 사용되는 [[메서드(Method)]]이다.

- 인자에 [[콜백 함수(Callback Function)]]를 넣어 사용한다.


## 예시

```javascript
const array = ['1번', '2번', '3번'];

array.forEach((element)=>{
	console.log(element);
})

// >> 1번
// >> 2번
// >> 3번
```