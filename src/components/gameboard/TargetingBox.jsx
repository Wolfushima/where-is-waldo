import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCharacterStatus } from '../../slices/gameboard/currentGameSlice';

export default function TargetingBox({
  imageClickCoordinates,
  targetingBoxStyle,
  level,
  setIsTargetingBoxActive,
}) {
  const { CHARACTERS_POSITION_BOUNDS } = useSelector(
    (state) => state.levels[level]
  );
  const { CHARACTERS_STATUS, CHARACTERS } = useSelector(
    (state) => state.currentGame[level]
  );
  const [wrongCharacterClicked, setWrongCharacterClicked] = useState('');
  const dispatch = useDispatch();

  const closeTargetingBox = () => setIsTargetingBoxActive(false);

  const handleSelectedCharacter = (character) => {
    const { relativePosX, relativePosY } = imageClickCoordinates;
    const isCharacterLocated = (posX, posY, characterName) => {
      const characterData = CHARACTERS_POSITION_BOUNDS[characterName];
      const isFound =
        posX > characterData.xLeft &&
        posX < characterData.xRight &&
        posY > characterData.yTop &&
        posY < characterData.yBottom;
      if (isFound && !CHARACTERS_STATUS[characterName].isFound) {
        dispatch(setCharacterStatus({ level, character: characterName }));
        console.log(`You found ${characterName}!`);
      } else setWrongCharacterClicked(character);
    };

    isCharacterLocated(relativePosX, relativePosY, character);
  };

  return (
    <ul className="targeting-box" style={targetingBoxStyle}>
      {CHARACTERS.map((character) => (
        <li key={`${character}KEY`}>
          <button
            type="button"
            onClick={() => handleSelectedCharacter(character)}
            className={`
              ${
                CHARACTERS_STATUS[character].isFound
                  ? 'targeting-box__found'
                  : ''
              }
              ${
                wrongCharacterClicked.includes(character)
                  ? 'targeting-box__wrong'
                  : ''
              }
            `}
            onAnimationEnd={() => setWrongCharacterClicked('')}
          >
            {character.split('_')[0].toLowerCase()}
          </button>
        </li>
      ))}
      <li>
        <button
          type="button"
          className="targeting-box__close"
          onClick={closeTargetingBox}
        >
          Close Box
        </button>
      </li>
    </ul>
  );
}
