import React from 'react';
import GameBoardCharacter from './GameBoardCharacter';
import CHARACTERS from '../../data/characters';
import GameBoardTimer from './GameBoardTimer';

const GameBoardFooter = ({ level, toggleBoardImgZoom }) => (
  <div className="gameboard__footer">
    <div className="gameboard__timer">
      <p>SCORE</p>
      <GameBoardTimer level={level} />
    </div>
    <div className="gameboard__characters">
      {CHARACTERS.map((character) => (
        <GameBoardCharacter
          characterSrc={character.src}
          characterAlt={character.alt}
          characterId={character.id}
          level={level}
          key={character.alt}
        />
      ))}
    </div>
    <button
      className="gameboard__magnifier-button"
      type="button"
      onClick={toggleBoardImgZoom}
    >
      MAGNIFIER
    </button>
  </div>
);

export default GameBoardFooter;
