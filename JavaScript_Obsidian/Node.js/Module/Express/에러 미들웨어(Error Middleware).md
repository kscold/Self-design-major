- 일반적인 [[노드(Node.js)]]와 [[express]] 라이브러리에서 [[에러(error)]]를 처리하는 [[객체(Object)]]로 Error [[객체(Object)]]를 사용하지만 이는 너무 자세하게 정보를 보여주기 때문에 보안적으로 좋지 않다.

- 따라서 [[app.use()]] [[메서드(Method)]]를 사용해서 [[미들웨어(Middleware)]]를 선언하는데 에러 미들웨어의 경우에는 할당되는 err, [[req]], [[res]], next의 4개의 모든 [[매개변수(parameter)]]를 반드시 사용하지는 않아도 정의는 해야한다.


## 문법

```js
app.use((err, req, res, next) => {
	console.error(err);
})
```