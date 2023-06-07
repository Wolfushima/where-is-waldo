import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Wrapper from './Wrapper';
import WaldoImg from '../assets/characters/waldo.png';

const Header = () => {
  const { pathname } = useLocation();

  return (
    <header id="header" className="header">
      <Wrapper className="header">
        <div className="header__logo">
          <Link to="/" className="header__icon-waldo">
            <img src={WaldoImg} alt="Waldo" />
          </Link>
          <h1>
            <Link to="/">
              WHERE&apos;S&nbsp;<span>WALDO?</span>
            </Link>
          </h1>
        </div>
        <nav>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink
                to="leaderboard/LEVEL1"
                className={pathname.includes('leaderboard') ? 'active' : ''}
              >
                Leaderboard
              </NavLink>
            </li>
            <li>
              <NavLink to="about">About</NavLink>
            </li>
          </ul>
        </nav>
      </Wrapper>
    </header>
  );
};

export default Header;
