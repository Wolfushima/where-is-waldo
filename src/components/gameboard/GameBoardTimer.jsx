import React, { useEffect, useState } from 'react';
import { format, parseISO, differenceInMilliseconds } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { setScore } from '../../slices/gameboard/currentGameSlice';

const GameBoardTimer = ({ level }) => {
  const dispatch = useDispatch();
  const { DATE, GAME_OVER } = useSelector((state) => state.currentGame[level]);
  const [timeElapsed, setTimeElapsed] = useState('00:00:00');

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsed(
        format(differenceInMilliseconds(new Date(), parseISO(DATE)), 'mm:ss:SS')
      );
    }, 10);
    if (GAME_OVER) {
      clearInterval(interval);
      dispatch(setScore({ level, score: timeElapsed }));
    }
    return () => clearInterval(interval);
  }, [GAME_OVER]);

  return <p>Timer: {timeElapsed}</p>;
};

export default GameBoardTimer;
