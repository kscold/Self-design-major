import { useState } from 'react';

const Player = ({ initialName, symbol, isActive, onChangeName }) => {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing((editing) => !editing);

    // 아름을 수정할 때에만 동작을 하게하고 싶기 때문에
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  };

  const handleChange = (event) => setPlayerName(event.target.value);

  let editablePlayerName = <span className="player-name">{playerName}</span>;
  let btnCaption = 'Save';

  if (isEditing) {
    editablePlayerName = (
      <input type="text" required value={playerName} onChange={handleChange} /> // onChange로 값을 변경하고 value로 다시 값을 적용함(양방향 바인딩)
    );
  }

  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>
        {isEditing ? btnCaption : 'Edit'}
      </button>
    </li>
  );
};

export default Player;
