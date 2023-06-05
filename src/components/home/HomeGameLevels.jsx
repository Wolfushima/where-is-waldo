import React from 'react';
import { Link } from 'react-router-dom';
import HOME_IMAGE_LEVELS from '../../data/home-image-levels';

const overlayBackgroundColorStyle = {
  LEVEL1: '32 32 32',
  LEVEL2: '28 34 0',
  LEVEL3: '0 0 0',
  LEVEL4: '35 26 0',
  LEVEL5: '0 22 29',
  LEVEL6: '29 25 0',
};

const HomeGameLevel = ({ level, value }) => {
  return (
    <Link
      to={`game/${level}`}
      className="home__game-level"
      style={{
        backgroundImage: `url(${value.src})`,
      }}
    >
      <div
        className="home__game-level-overlay"
        style={{
          backgroundColor: `rgb(${overlayBackgroundColorStyle[value.level]})`,
        }}
      />
      <p>LEVEL</p>
      <p>{value.levelNumber}</p>
    </Link>
  );
};

export default function HomeGameLevels() {
  return (
    <section className="home__game-levels">
      <h3>PLAY</h3>
      {Object.entries(HOME_IMAGE_LEVELS).map(([level, value]) => (
        <HomeGameLevel level={level} value={value} key={level} />
      ))}
    </section>
  );
}
