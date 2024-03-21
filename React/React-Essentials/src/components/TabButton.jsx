const TabButton = ({ children, onSelect }) => {
  console.log('TAPBUTTON COMPONENT EXCUTING');

  return (
    <li>
      <button onClick={onSelect}>{children}</button>
    </li>
  );
};

export default TabButton;
