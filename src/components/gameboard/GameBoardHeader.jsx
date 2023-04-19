import React from 'react';
import GameBoardCharacter from './GameBoardCharacter';
import CHARACTERS from '../../data/characters';

const GameBoardHeader = ({ toggleBoardImgZoom, isCharacterFound }) => (
  <div className="gameboard__header">
    <div className="gameboard__characters">
      {CHARACTERS.map((character) => (
        <GameBoardCharacter
          characterSrc={character.src}
          characterAlt={character.alt}
          characterStatus={isCharacterFound}
          key={character.alt}
        />
      ))}
    </div>
    <button
      className="gameboard__magnifier-button"
      type="button"
      onClick={toggleBoardImgZoom}
    >
      Magnifier
    </button>
  </div>
);

export default GameBoardHeader;
