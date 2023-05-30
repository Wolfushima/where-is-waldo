import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import GameBoard from '../components/gameboard/GameBoard';
import GAMEBOARD_IMAGE_LEVELS from '../data/gameboard-image-levels';
import { useFetchLevelCharactersQuery } from '../services/firebase/firestoreApi';
import { setLevelData } from '../slices/gameboard/levelsSlice';
import {
  setNewGame,
  resetGameToInitialState,
} from '../slices/gameboard/currentGameSlice';
import LoadingGameData from '../components/game/LoadingGameData';

export default function Game() {
  const { level } = useParams();
  const storeLevels = useSelector((state) => state.levels);
  const dispatch = useDispatch();
  const { data: levelCharacters, isLoading } =
    useFetchLevelCharactersQuery(level);
  const GAMEBOARD_IMG = GAMEBOARD_IMAGE_LEVELS[level].src;
  const storeCurrentGame = useSelector((state) => state.currentGame);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (levelCharacters && !isLoading) {
      const levelData = { level, levelData: levelCharacters };
      const timeout = setTimeout(() => {
        setShowLoader(false);
      }, 2000);
      dispatch(setLevelData(levelData));
      dispatch(setNewGame(levelData));

      return () => clearTimeout(timeout);
    }
  }, [levelCharacters]);

  useEffect(() => {
    return () => dispatch(resetGameToInitialState());
  }, []);

  if (showLoader) return <LoadingGameData />;
  if (storeLevels[level] && storeCurrentGame[level]) {
    return <GameBoard boardImg={GAMEBOARD_IMG} level={level} />;
  }
}
