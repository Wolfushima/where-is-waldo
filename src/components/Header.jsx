import React from 'react';
import { Link } from 'react-router-dom';
import Wrapper from './Wrapper';
import WaldoImg from '../assets/characters/waldo.png';

const Header = () => (
  <header id="header" className="header">
    <Wrapper className="header">
      <Link to="/" className="header__icon-waldo">
        <img src={WaldoImg} alt="Waldo" />
      </Link>
      <h1>
        <Link to="/">
          WHERE&apos;S&nbsp;<span>WALDO?</span>
        </Link>
      </h1>
    </Wrapper>
  </header>
);

export default Header;
