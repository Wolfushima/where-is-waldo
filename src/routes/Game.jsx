import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import GameBoard from '../components/gameboard/GameBoard';
import GAMEBOARD_IMAGE_LEVELS from '../data/gameboard-image-levels';
import { useFetchLevelCharactersQuery } from '../services/firebase/firestoreApi';
import { setLevelData } from '../slices/gameboard/levelsSlice';
import { setNewGame } from '../slices/gameboard/currentGameSlice';

export default function Game() {
  const { level } = useParams();
  const storeLevels = useSelector((state) => state.levels);
  const dispatch = useDispatch();
  const { data: levelCharacters, isLoading } =
    useFetchLevelCharactersQuery(level);
  const GAMEBOARD_IMG = GAMEBOARD_IMAGE_LEVELS[level].src;
  const storeCurrentGame = useSelector((state) => state.currentGame);

  useEffect(() => {
    if (levelCharacters && !isLoading) {
      const levelData = { level, levelData: levelCharacters };
      dispatch(setLevelData(levelData));
      dispatch(setNewGame(levelData));
    }
  }, [levelCharacters]);

  if (isLoading) return <p>loading...</p>;
  if (storeLevels[level]) {
    return (
      <>
        <button
          type="button"
          onClick={() => {
            console.log(storeLevels);
            console.log(storeCurrentGame);
          }}
        >
          console store
        </button>
        <GameBoard boardImg={GAMEBOARD_IMG} level={level} />
      </>
    );
  }
}
