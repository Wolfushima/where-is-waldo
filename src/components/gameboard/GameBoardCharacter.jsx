import React from 'react';

const GameBoardCharacter = ({
  characterSrc,
  characterAlt,
  characterStatus,
}) => (
  <div className={`gameboard__character ${characterStatus ? 'found' : null}`}>
    <img src={characterSrc} alt={characterAlt} />
  </div>
);

export default GameBoardCharacter;
