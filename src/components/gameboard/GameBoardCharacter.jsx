import React from 'react';
import { useSelector } from 'react-redux';

const GameBoardCharacter = ({
  characterSrc,
  characterAlt,
  level,
  characterId,
}) => {
  const { CHARACTERS_STATUS } = useSelector(
    (state) => state.currentGame[level]
  );

  return (
    <div
      className={`gameboard__character ${
        CHARACTERS_STATUS[characterId + level].isFound ? 'found' : null
      }`}
    >
      <img src={characterSrc} alt={characterAlt} />
    </div>
  );
};

export default GameBoardCharacter;
