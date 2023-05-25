import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCharacterStatus } from '../../slices/gameboard/currentGameSlice';
import moveMagnifier from '../../utils/gameboard/move-magnifier';
import getCursorPos from '../../utils/gameboard/get-cursor-pos';

const GameBoardBoard = ({ isZoomEnabled, boardImg, level }) => {
  const { CHARACTERS_POSITION_BOUNDS } = useSelector(
    (state) => state.levels[level]
  );
  const { CHARACTERS_STATUS, CHARACTERS } = useSelector(
    (state) => state.currentGame[level]
  );
  const [magnifierGlassStyle, setMagnifierGlassStyle] = useState({
    backgroundImage: `url(${boardImg})`,
  });
  const [targetingBoxStyle, setTargetingBoxStyle] = useState({
    display: 'none',
    top: '',
    left: '',
  });
  const [clickCoordinates, setClickCoordinates] = useState({});
  const dispatch = useDispatch();

  const handleBoardImgZoom = (e) => {
    if (isZoomEnabled) {
      moveMagnifier(e, magnifierGlassStyle, setMagnifierGlassStyle);
    }
  };

  const handleClickCoordinates = (cursorX, cursorY, imgRect) => {
    const relativePosX = Math.floor((cursorX / imgRect.width) * 100);
    const relativePosY = Math.floor((cursorY / imgRect.height) * 100);
    setClickCoordinates({ ...clickCoordinates, relativePosX, relativePosY });
  };

  const closeTargetingBox = () =>
    setTargetingBoxStyle({ ...targetingBoxStyle, display: 'none' });

  const showTargetingBox = (e) => {
    const imgElement = e.target;
    const { cursorX, cursorY, imgRect } = getCursorPos(e, imgElement);
    const targetingBoxWidth = 90;
    const targetingBoxHeight = 175;
    const targetBoxBounderiesX =
      imgRect.right - targetingBoxWidth + window.scrollX;
    const targetBoxBounderiesY =
      imgRect.bottom - targetingBoxHeight + window.scrollY;
    let newTargetStyleLeft = e.pageX;
    let newTargetStyleTop = e.pageY;

    if (e.pageX > targetBoxBounderiesX) {
      newTargetStyleLeft = e.pageX - targetingBoxWidth;
    }
    if (e.pageY > targetBoxBounderiesY) {
      newTargetStyleTop = e.pageY - targetingBoxHeight;
    }

    handleClickCoordinates(cursorX, cursorY, imgRect);
    setTargetingBoxStyle({
      ...targetingBoxStyle,
      display: 'flex',
      top: newTargetStyleTop,
      left: newTargetStyleLeft,
    });
  };

  const handleSelectedCharacter = (character) => {
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
      }
    };

    isCharacterLocated(
      clickCoordinates.relativePosX,
      clickCoordinates.relativePosY,
      character
    );
  };

  return (
    <div className="gameboard__board">
      <div className={`gameboard__board-img ${isZoomEnabled ? 'zoom' : null}`}>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
        <img
          src={boardImg}
          alt="Game Board"
          id="whereiswaldo-img"
          onMouseMove={handleBoardImgZoom}
          onClick={showTargetingBox}
        />
        <ul className="targeting-box" style={targetingBoxStyle}>
          {CHARACTERS.map((character) => (
            <li key={`${character}KEY`}>
              <button
                type="button"
                onClick={() => handleSelectedCharacter(character)}
                className={
                  CHARACTERS_STATUS[character].isFound
                    ? 'targeting-box__found'
                    : ''
                }
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
};

export default GameBoardBoard;
