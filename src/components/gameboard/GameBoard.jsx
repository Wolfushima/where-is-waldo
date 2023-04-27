import React, { useState } from 'react';
import CHARACTER_POSITION_BOUNDS from '../../data/character-position-bounds';
import moveMagnifier from '../../utils/gameboard/move-magnifier';
import getCursorPos from '../../utils/gameboard/get-cursor-pos';
import Wrapper from '../Wrapper';
import GameBoardHeader from './GameBoardHeader';
import GameBoardBoard from './GameBoardBoard';

const GameBoard = ({ boardImg, boardImgAlt }) => {
  const [isZoomEnabled, setIsZoomEnabled] = useState(false);
  const [magnifierGlassStyle, setMagnifierGlassStyle] = useState({
    backgroundImage: `url(${boardImg})`,
  });
  const [isCharacterFound, setIsCharacterFound] = useState(false);

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

    const isWaldoFound =
      relativePosX > CHARACTER_POSITION_BOUNDS.lvl1.waldo.xLeft &&
      relativePosX < CHARACTER_POSITION_BOUNDS.lvl1.waldo.xRight &&
      relativePosY > CHARACTER_POSITION_BOUNDS.lvl1.waldo.yTop &&
      relativePosY < CHARACTER_POSITION_BOUNDS.lvl1.waldo.yBottom;

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
          boardImgAlt={boardImgAlt}
          handleBoardImgZoom={handleBoardImgZoom}
          handleBoardImgClick={handleBoardImgClick}
          magnifierGlassStyle={magnifierGlassStyle}
        />
      </Wrapper>
    </section>
  );
};

export default GameBoard;
