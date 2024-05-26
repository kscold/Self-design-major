import { createContext, useState } from 'react';

const ColorContext = createContext({
  state: {
    color: 'black',
    subcolor: 'red',
  },
  actions: {
    setColor: () => {},
    setSubcolor: () => {},
  },
}); // consumer에서 사용할 수 있도록 기본값 객체를 등록

const ColorProvider = ({ children }) => {
  const [color, setColor] = useState('black');
  const [subcolor, setSubcolor] = useState('red');

  const value = {
    state: { color, subcolor },
    actions: { setColor, setSubcolor },
  };

  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
};

export { ColorProvider, ColorContext };
