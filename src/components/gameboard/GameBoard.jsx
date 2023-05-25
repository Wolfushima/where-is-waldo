import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatISO } from 'date-fns';
import Wrapper from '../Wrapper';
import GameBoardBoard from './GameBoardBoard';
import { setGameOver, setDate } from '../../slices/gameboard/currentGameSlice';
import GameBoardOverview from './GameBoardOverview';
import GameBoardFooter from './GameBoardFooter';
import GameBoardModal from './GameBoardModal';

const GameBoard = ({ boardImg, level }) => {
  const { CHARACTERS_STATUS, GAME_OVER } = useSelector(
    (state) => state.currentGame[level]
  );
  const [isZoomEnabled, setIsZoomEnabled] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const dispatch = useDispatch();

  const toggleBoardImgZoom = () => {
    setIsZoomEnabled(!isZoomEnabled);
  };

  const handleStart = () => {
    if (startGame) return;
    dispatch(setDate({ level, date: formatISO(new Date()) }));
    setStartGame(true);
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
        {!startGame && <GameBoardOverview handleStart={handleStart} />}
        {startGame && (
          <>
            <GameBoardBoard
              isZoomEnabled={isZoomEnabled}
              boardImg={boardImg}
              level={level}
            />
            <GameBoardFooter
              toggleBoardImgZoom={toggleBoardImgZoom}
              level={level}
            />
          </>
        )}
        {GAME_OVER && <GameBoardModal level={level} />}
      </Wrapper>
    </section>
  );
};

export default GameBoard;
