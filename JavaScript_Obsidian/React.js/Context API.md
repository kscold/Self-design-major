- Context는 [[리액트(React)]] [[컴포넌트(Component)]]간에 어떠한 값을 공유할수 있게 해주는 기능이다.

- 주로 Context는 전역적(global)으로 필요한 값을 다룰 때 사용하나, 꼭 전역적일 필요는 없다.
- 따라서 Context API는 [[props]] driling을 방지할 수 있다.


## Context의 사용

- Context 는 리액트 패키지에서 `createContext` 라는 함수를 불러와서 만들 수 있다.

```jsx
import { createContext } from 'react';
const MyContext = createContext();
```

- Context [[객체(Object)]] 안에는 Provider라는 컴포넌트가 들어있다. 
- 그리고, 그 컴포넌트간에 공유하고자 하는 값을 value 라는 [[props]]로 설정하면 자식 [[컴포넌트(Component)]]들에서 해당 값에 바로 접근을 할 수 있다.

```jsx
function App() {
  return (
    <MyContext.Provider value="Hello World">
      <GrandParent />
    </MyContext.Provider>
  );
}
```

- 이렇게 하면, 원하는 컴포넌트에서 useContext라는 [[Hooks]]을 사용하여 Context에 넣은 값에 바로 접근할 수 있다. 

- 해당 Hook의 인자에는 createContext()로 만든 MyContext를 넣는다.

```jsx
import { createContext, useContext } from 'react';

function Message() {
  const value = useContext(MyContext);
  return <div>Received: {value}</div>;
}
```

- 이렇게 하면 중간 중간 여러 컴포넌트를 거쳐 전달하던 Props를 지워주어도 된다.

```js
import { createContext, useContext } from 'react';
const MyContext = createContext();

function App() {
  return (
    <MyContext.Provider value="Hello World">
      <GrandParent />
    </MyContext.Provider>
  );
}

function GrandParent() {
  return <Parent />;
}

function Parent() {
  return <Child />;
}

function Child() {
  return <GrandChild />;
}

function GrandChild() {
  return <Message />;
}

function Message() {
  const value = useContext(MyContext);
  return <div>Received: {value}</div>;
}

export default App;
```