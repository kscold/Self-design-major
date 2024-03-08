- async await 문법을 사용하면 [[Promise chainning]]없이 훨신 간단하게 [[비동기(asynchronous)]] 작업을 처리할 수 있다.

- async [[키워드(Keyword)]]를 붙이면 항상 [[Promise]] [[비동기(asynchronous)]] [[함수(Function)]]가 되어버린다.
- 만약 이미 [[Promise]] 상태의 데이터에 async를 붙인다 해도 또 [[Promise]]로 감싸지는 것은 아니다.

- [[비동기(asynchronous)]] [[함수(Function)]]를 [[동기(Synchronous)]]적으로 처리하는데, await [[키워드(Keyword)]]를 붙이지 않으면 [[비동기(asynchronous)]]적으로 작동하기 때문에 async로 [[Promise]]로 만들어 주었다면 await를 꼭 붙여주어야 한다.

## 예시

```js
function newtworkRequest() {
	return new Promise((resolve) => {
		setTimeout(() => {
			console.log('데이터를 받아왔습니다');
			resolve();
		}, 2000);
	});
}

async function getUser() {
	await newtworkRequest();
	return '별코딩';
}

async function getTodo() {
	await networkRequest();
	return ['청소하기', '밥먹기'];
}

async function getData() {
	const user = await getUser();
	const todo = await getTodo();
	
	console.log(`${user}님 ${todo}를 하세요`);
}

getData()
```

### 에러 처리

```js
async function getData() {
	let user;
	
	try {
		const user = await getUser();
	} catch (error) {
		console.log(error.message);
		user = '익명';
	}
	
	const todo = await getTodo();
	
	console.log(`${user}님 ${todo}를 하세요`);
}
```

### [[fetch()]] API 사용

- 실제 api 통신에서서는 [[json()]] 메서드를 통해 [[JSON(Java Script Object Notation)]]를 문자열도 반환한다.
- [[json()]] [[메서드(Method)]] 또한 [[Promise]]를 반환하기 때문에 await [[키워드(Keyword)]]를 사용한다.

```js
async function fetchData() {
	const response = await fetch("https://jsonplaceholder.typicode.com/users");
	const data = await response.json()

	console.log(resopnse);
}

fetchData()
```