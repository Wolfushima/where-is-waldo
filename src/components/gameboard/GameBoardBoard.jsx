import React from 'react';

const GameBoardBoard = ({
  isZoomEnabled,
  boardImg,
  boardImgAlt,
  handleBoardImgZoom,
  handleBoardImgClick,
  magnifierGlassStyle,
}) => (
  <div className="gameboard__board">
    <div className={`gameboard__board-img ${isZoomEnabled ? 'zoom' : null}`}>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
      <img
        src={boardImg}
        alt={boardImgAlt}
        id="whereiswaldo-img"
        onMouseMove={handleBoardImgZoom}
        onClick={handleBoardImgClick}
      />
    </div>
    {isZoomEnabled && (
      <div
        id="magnifier-glass"
        className="gameboard__magnifier-glass"
        style={magnifierGlassStyle}
      />
    )}
  </div>
);

export default GameBoardBoard;
