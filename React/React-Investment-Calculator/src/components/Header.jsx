import logo from '../assets/investment-calculator-logo.png';

const Header = () => {
  return (
    <header id="header">
      <img src={logo} alt="Logo showing a money bag" />
      <h1>투자 계산기</h1>
    </header>
  );
};

export default Header;
