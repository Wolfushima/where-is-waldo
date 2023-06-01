import React from 'react';
import { Link } from 'react-router-dom';
import HOME_IMAGE_LEVELS from '../../data/home-image-levels';

export default function HomeGameLevels() {
  return (
    <section className="home__game-levels">
      <h3>PLAY</h3>
      {Object.entries(HOME_IMAGE_LEVELS).map(([key, value], index) => {
        return (
          <Link
            to={`game/${key}`}
            className="home__game-level"
            key={`gameboard${index}`}
          >
            <p>{value.levelName}</p>
            <div className="home__game-img">
              <img src={value.src} alt="Gameboard" />
            </div>
          </Link>
        );
      })}
    </section>
  );
}
