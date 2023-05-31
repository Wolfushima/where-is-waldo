import React, { useState } from 'react';
import moveMagnifier from '../../utils/gameboard/move-magnifier';
import getCursorPos from '../../utils/gameboard/get-cursor-pos';
import MagnifierGlass from './MagnifierGlass';
import TargetingBox from './TargetingBox';

const GameBoardBoard = ({ isZoomEnabled, boardImg, level }) => {
  const [magnifierGlassStyle, setMagnifierGlassStyle] = useState({
    backgroundImage: `url(${boardImg})`,
  });
  const [imageClickCoordinates, setImageClickCoordinates] = useState({
    relativePosX: undefined,
    relativePosY: undefined,
  });
  const [isTargetingBoxActive, setIsTargetingBoxActive] = useState(false);
  const [targetingBoxStyle, setTargetingBoxStyle] = useState({
    top: '',
    left: '',
  });

  const handleBoardImgZoom = (e) => {
    if (isZoomEnabled) {
      moveMagnifier(e, magnifierGlassStyle, setMagnifierGlassStyle);
    }
  };

  const getTargetingBoxPosition = (pageX, pageY, imgRect) => {
    const targetingBoxWidth = 90;
    const targetingBoxHeight = 175;
    const targetBoxBounderiesX =
      imgRect.right - targetingBoxWidth + window.scrollX;
    const targetBoxBounderiesY =
      imgRect.bottom - targetingBoxHeight + window.scrollY;
    let newTargetStyleLeft = pageX;
    let newTargetStyleTop = pageY;

    if (pageX > targetBoxBounderiesX) {
      newTargetStyleLeft = pageX - targetingBoxWidth;
    }
    if (pageY > targetBoxBounderiesY) {
      newTargetStyleTop = pageY - targetingBoxHeight;
    }
    return { newTargetStyleLeft, newTargetStyleTop };
  };

  const getImageClickCoordinates = (cursorX, cursorY, imgRect) => {
    const relativePosX = Math.floor((cursorX / imgRect.width) * 100);
    const relativePosY = Math.floor((cursorY / imgRect.height) * 100);
    return { relativePosX, relativePosY };
  };

  const handleBoardImgClick = (e) => {
    const imgElement = e.target;
    const { cursorX, cursorY, imgRect } = getCursorPos(e, imgElement);
    const { pageX, pageY } = e;
    const { relativePosX, relativePosY } = getImageClickCoordinates(
      cursorX,
      cursorY,
      imgRect
    );
    const { newTargetStyleLeft, newTargetStyleTop } = getTargetingBoxPosition(
      pageX,
      pageY,
      imgRect
    );

    setImageClickCoordinates({
      relativePosX,
      relativePosY,
    });
    setTargetingBoxStyle({
      top: newTargetStyleTop,
      left: newTargetStyleLeft,
    });
    if (!isTargetingBoxActive) setIsTargetingBoxActive(true);
  };

  return (
    <div className="gameboard__board">
      <div className={`gameboard__board-img ${isZoomEnabled ? 'zoom' : ''}`}>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
        <img
          src={boardImg}
          alt="Game Board"
          id="whereiswaldo-img"
          onMouseMove={handleBoardImgZoom}
          onTouchMove={handleBoardImgZoom}
          onClick={handleBoardImgClick}
        />
        {isTargetingBoxActive && (
          <TargetingBox
            imageClickCoordinates={imageClickCoordinates}
            targetingBoxStyle={targetingBoxStyle}
            setIsTargetingBoxActive={setIsTargetingBoxActive}
            level={level}
          />
        )}
      </div>
      {isZoomEnabled && (
        <MagnifierGlass magnifierGlassStyle={magnifierGlassStyle} />
      )}
    </div>
  );
};

export default GameBoardBoard;
