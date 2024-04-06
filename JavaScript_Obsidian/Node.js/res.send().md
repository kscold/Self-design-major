- res.send()는 [[노드(Node.js)]]의 [[express]] 라이브러리에서 response 보내는 역할을 한다.
- 즉, 기본 응답 [[객체(Object)]]라고 생각하면 된다.

- 원래 기본적으로 서버에서 response처리를 할 때 Content-Type을 지정해주어야 한다.

- res.send는 우리가 어떤 데이터를 보내는지 파악을 해서 이에 알맞게 Contnet-Type을 지정해준다. 
- 이는 [[버퍼(Buffer)]],String, [[객체(Object)]], [[배열(Array)]] 일 수 있다.

- 예를 들어서 Buffer 데이터를 반환해준다면 res.send는 자동으로 Content-Type을 `application/octet-stream`으로 지정한다.


## 문법

- [[express]] 서버가 [[HTTP(Hyper Tranfer Protocol)]] 요청을 받게되면, [[app.get()]] [[메서드(Method)]]를 사용할 때 2번째 [[매개변수(parameter)]] 안에는 [[콜백 함수(Callback Function)]]가 들어가는데 이 때 [[콜백 함수(Callback Function)]]의 [[매개변수(parameter)]]는 (req, res)가 사용되며 res를 반환하게 된다.

```js
app.get("/api/login", (req, res) => {
  // ... do something ...
});
```

- 이때 res는 [[노드(Node.js)]]만의 업그레이드된 response object이다.


## res.send(), res.json(), res.end()의 차이

### res.send()

- `res.send()`는 send에 전해진 argument에 따라서 Content-type이 자동적으로 만들어진다. 
- 기본설정이다.
### [[res.json()]]

- `res.json()`은 json이 아닌 것도 [[JSON(Java Script Object Notation)]] 형식으로 바꾸어서 보내준다. 

- 즉 content-type 헤더를 application/JSON으로 고정한다. 
- 그런데 결국 res.json()도 마지막에 res.send()를 호출한다.  
### [[res.end()]]

- res.end()는 더이상 보내줄 데이터도 없을 때 response를 끝내고 싶을 때 사용한다. 
- 예) res.status(400).end();
