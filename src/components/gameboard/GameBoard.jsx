import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import moveMagnifier from '../../utils/gameboard/move-magnifier';
import getCursorPos from '../../utils/gameboard/get-cursor-pos';
import Wrapper from '../Wrapper';
import GameBoardHeader from './GameBoardHeader';
import GameBoardBoard from './GameBoardBoard';

const GameBoard = ({ boardImg }) => {
  const [isZoomEnabled, setIsZoomEnabled] = useState(false);
  const [magnifierGlassStyle, setMagnifierGlassStyle] = useState({
    backgroundImage: `url(${boardImg})`,
  });
  const [isCharacterFound, setIsCharacterFound] = useState(false);
  const WALDO_DATA = useSelector(
    (state) => state.levels.LEVEL1.CHARACTERS_POSITION_BOUNDS.WALDO_LEVEL1
  );

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

    const isCharacterLocated = (posX, posY, characterData) => {
      return (
        posX > characterData.xLeft &&
        posX < characterData.xRight &&
        posY > characterData.yTop &&
        posY < characterData.yBottom
      );
    };

    const isWaldoFound = isCharacterLocated(
      relativePosX,
      relativePosY,
      WALDO_DATA
    );

    if (isWaldoFound) {
      setIsCharacterFound(true);
      console.log('You found waldo!');
    }
  };

  const toggleBoardImgZoom = () => {
    setIsZoomEnabled(!isZoomEnabled);
  };

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
