- 값을 바로 반환하고 싶다면 코드 블록 { }를 생략하면 된다.
- 화살표함수로 선언하면 [[메서드(Method)]] [[바인딩(binding)]]을 생략할 수 있다.

- 주로 [[콜백 함수(Callback Function)]]를 정의 할때 사용한다.

## 예시

```jsx
setTimeout(funtion() {
	console.log('hello world');
}, 1000);
```


```jsx
setTimeout(() => {
	console.log('hello world');
}, 1000);
```

- 이 문법은 [[function]]을 대체할 수 없는 것은 용도가 다르기 때문이다. 
- 무엇보다 서로 가리키고 있는 [[this]] 값이 다르다.

```jsx
function BlackDog() {
	this.name = '흰둥이';

	return {
		name: '검둥이',
		bark: function() {
			console.log(this.name + ': 멍멍!');
		}
	}
}

const blackDog = new BlackDog();
blackDog.bark(); // 검둥이: 멍멍!

function WhiteDog() {
	this.name = '흰둥이';
	
	return {
		name: '검둥이',
		bark: () => {
			console.log(this.name + ': 멍멍!');
		}
	}
}

const whiteDog = new WhiteDog();
whiteDog.bark(); // 흰둥이: 멍멍!
```

- [[function]]을 사용했을 때는 검둥이가 나타나고, () => 를 사용했을 때는 흰둥이가 나타난다. 

- 일반 [[함수(Function)]]는 자신이 종속된 [[객체(Object)]]를 [[this]]로 가리키며, 화살표 함수를 자신이 종속된 [[인스턴스(Instance)]]를 가리킨다.

- 화살표함수는 값을 연산하여 바로 반환해야 할 때 사용하면 가독성을 높일 수 있다.

```jsx
function twice(value) {
	return value * 2;
}

const triple = (value) => value * 3;
```

- 따로 {}를 열어 주지 않으면, 연산한 값을 그대로 반환한다는 의미이다.

```js
const triple = (value) => {
	return(value * 3);
}
```

- () 소괄호는 바로 return을 한다는 의미이다.