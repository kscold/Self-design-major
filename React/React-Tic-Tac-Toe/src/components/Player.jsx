import { useState } from 'react';

const Player = ({ initialName, symbol }) => {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => setIsEditing((editing) => !editing);
  const handleChange = (event) => setPlayerName(event.target.value);

  let editablePlayerName = <span className="player-name">{playerName}</span>;
  let btnCaption = 'Save';

  if (isEditing) {
    editablePlayerName = (
      <input type="text" required value={playerName} onChange={handleChange} /> // onChange로 값을 변경하고 value로 다시 값을 적용함(양방향 바인딩)
    );
  }

  return (
    <li>
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
