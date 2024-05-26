import { useContext } from 'react';
import { ColorContext } from '../contexts/color';

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

const SelectColors = () => {
  const { actions } = useContext(ColorContext);
  const { setColor, setSubcolor } = actions;

  const handleSetColor = (color) => {
    setColor(color);
  };

  const handleSetSubColor = (color) => {
    setSubcolor(color);
  };
  return (
    <div>
      <h2>색상을 선택하세요.</h2>
      <div style={{ display: 'flex' }}>
        {colors.map((color) => (
          <div
            key={color}
            style={{
              background: color,
              width: '24px',
              height: '24px',
              cursor: 'pointer',
            }}
            onClick={() => handleSetColor(color)}
            onContextMenu={(e) => {
              e.preventDefault(); // 마우스 우클릭시 메뉴가 뜨는 것을 방지
              handleSetSubColor(color);
            }}
          />
        ))}
      </div>
      <hr />
    </div>
  );
};

export default SelectColors;
