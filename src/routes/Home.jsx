import React from 'react';
import { Link } from 'react-router-dom';
import Wrapper from '../components/Wrapper';
import GAMEBOARD_IMAGE_LEVELS from '../data/gameboard-image-levels';

export default function Home() {
  return (
    <div id="home" className="home">
      <Wrapper className="home">
        <section className="home__game-levels">
          {Object.entries(GAMEBOARD_IMAGE_LEVELS).map(([key, value]) => {
            return (
              <Link to={`game/${key}`} className="home__game-level">
                <p>{value.level}</p>
                <div className="home__game-img">
                  <img src={value.src} alt="Gameboard" />
                </div>
              </Link>
            );
          })}
        </section>
      </Wrapper>
    </div>
  );
}
