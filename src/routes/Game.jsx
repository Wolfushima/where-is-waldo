import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import GameBoard from '../components/gameboard/GameBoard';
import GAMEBOARD_IMAGE_LEVELS from '../data/gameboard-image-levels';
import { useFetchLevelCharactersQuery } from '../services/firebase/firestoreApi';
import { setLevelData } from '../slices/gameboard/levelsSlice';

export default function Game() {
  const { level } = useParams();
  const storeLevels = useSelector((state) => state.levels);
  const dispatch = useDispatch();
  const { data: levelCharacters, isLoading } =
    useFetchLevelCharactersQuery(level);

  useEffect(() => {
    if (levelCharacters && !isLoading) {
      const levelData = { level, levelData: levelCharacters };
      dispatch(setLevelData(levelData));
    }
  }, [levelCharacters]);

  const GAMEBOARD_IMG = GAMEBOARD_IMAGE_LEVELS[level];
  if (isLoading) return <p>loading...</p>;
  if (storeLevels[level]) return <GameBoard boardImg={GAMEBOARD_IMG} />;
}
