import { useContext } from 'react';
import { ColorContext } from '../contexts/color';

const ColorBox = () => {
  const { state } = useContext(ColorContext);
  return (
    <>
      <div
        style={{
          width: '64px',
          height: '64px',
          background: state.color, // createContext에서 값을 빼올 수 있도록 만듬
        }}
      />
      <div
        style={{
          width: '32px',
          height: '32px',
          background: state.subcolor, // createContext에서 값을 빼올 수 있도록 만듬
        }}
      />
    </>
  );
};

export default ColorBox;
