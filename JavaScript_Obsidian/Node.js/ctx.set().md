- 주로 [[노드(Node.js)]]의 Koa나 Express와 같은 웹 프레임워크에서 사용한다.
- ctx.set() 형식으로 사용하여 [[HTTP]] 응답 헤더를 설정한다.

## Express에서 set() 사용

```js
ctx.set('Last-Page', Math.ceil(postCount / 10)); 
```

- 위 부분에서는 마지막 페이지 번호를 HTTP 응답 헤더에 설정한다.
- 여기서 `'Last-Page'`은 헤더 이름이고, `Math.ceil(postCount / 10)`는 페이지 수를 계산한 값이다.

- 이 코드는 문서 갯수를 10으로 나누고 올림한 결과를 마지막 페이지로 설정한다.
- 페이징에서는 일반적으로 한 페이지당 아이템의 수를 정의하며, 이 예에서는 10개로 가정한다.

- `Last-Page`로 header 설정을 하였기 때문에 postman에서 확인이 가능하다.