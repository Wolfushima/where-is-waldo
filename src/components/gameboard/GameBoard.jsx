import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moveMagnifier from '../../utils/gameboard/move-magnifier';
import getCursorPos from '../../utils/gameboard/get-cursor-pos';
import Wrapper from '../Wrapper';
import GameBoardHeader from './GameBoardHeader';
import GameBoardBoard from './GameBoardBoard';
import {
  setCharacterStatus,
  setGameOver,
} from '../../slices/gameboard/currentGameSlice';

const GameBoard = ({ boardImg, level }) => {
  const [isZoomEnabled, setIsZoomEnabled] = useState(false);
  const [magnifierGlassStyle, setMagnifierGlassStyle] = useState({
    backgroundImage: `url(${boardImg})`,
  });
  const [isCharacterFound, setIsCharacterFound] = useState(false);
  const { CHARACTERS_POSITION_BOUNDS } = useSelector(
    (state) => state.levels[level]
  );
  const { CHARACTERS_STATUS, CHARACTERS } = useSelector(
    (state) => state.currentGame[level]
  );
  const dispatch = useDispatch();

  const handleBoardImgZoom = (e) => {
    if (isZoomEnabled) {
      moveMagnifier(e, magnifierGlassStyle, setMagnifierGlassStyle);
    }
  };

  const handleBoardImgClick = (e) => {
    const imgElement = e.target;
    const { cursorX, cursorY, imgRect } = getCursorPos(e, imgElement);

    const relativePosX = Math.floor((cursorX / imgRect.width) * 100);
    const relativePosY = Math.floor((cursorY / imgRect.height) * 100);

    const isCharacterLocated = (posX, posY, characterName) => {
      const characterData = CHARACTERS_POSITION_BOUNDS[characterName];
      const isFound =
        posX > characterData.xLeft &&
        posX < characterData.xRight &&
        posY > characterData.yTop &&
        posY < characterData.yBottom;
      if (isFound && !CHARACTERS_STATUS[characterName].isFound) {
        setIsCharacterFound(true);
        dispatch(setCharacterStatus({ level, character: characterName }));
        console.log(`You found ${characterName}!`);
      }
    };

    CHARACTERS.forEach((character) => {
      if (!CHARACTERS_STATUS[character].isFound) {
        isCharacterLocated(relativePosX, relativePosY, character);
      }
    });
  };

  const toggleBoardImgZoom = () => {
    setIsZoomEnabled(!isZoomEnabled);
  };

  useEffect(() => {
    const allCharactersFound = Object.values(CHARACTERS_STATUS).every(
      (character) => character.isFound
    );
    if (allCharactersFound) {
      dispatch(setGameOver(level));
      console.log('YOU WON');
    }
  }, [CHARACTERS_STATUS]);

  return (
    <section id="gameboard" className="gameboard">
      <Wrapper className="gameboard">
        <GameBoardHeader
          isCharacterFound={isCharacterFound}
          toggleBoardImgZoom={toggleBoardImgZoom}
        />
        <GameBoardBoard
          isZoomEnabled={isZoomEnabled}
          boardImg={boardImg}
          handleBoardImgZoom={handleBoardImgZoom}
          handleBoardImgClick={handleBoardImgClick}
          magnifierGlassStyle={magnifierGlassStyle}
        />
      </Wrapper>
    </section>
  );
};

export default GameBoard;
