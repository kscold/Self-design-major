const TabButton = ({ children, onSelect, isSelected }) => {
  console.log('TAPBUTTON COMPONENT EXCUTING');

  return (
    <li>
      <button className={isSelected ? 'active' : undefined} onClick={onSelect}>
        {children}
      </button>
    </li>
  );
};

export default TabButton;
