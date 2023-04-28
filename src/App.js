import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFetchLevelCharactersQuery } from './services/firebase/firestoreApi';
import { setLevelData } from './slices/gameboard/levelsSlice';
import Header from './components/Header';
import GameBoard from './components/gameboard/GameBoard';
import GAMEBOARD_IMG_LVLS from './data/gameboard-img-lvls';

const TestButton = ({ level }) => {
  return (
    <button
      type="button"
      onClick={() => {
        console.log(level);
      }}
    >
      console store
    </button>
  );
};

function App() {
  const gameboardLevel = 'LEVEL1';
  const storeLevels = useSelector((state) => state.levels);
  const dispatch = useDispatch();
  const { data: levelCharacters, isLoading } =
    useFetchLevelCharactersQuery(gameboardLevel);

  useEffect(() => {
    if (levelCharacters && !isLoading) {
      const levelData = { level: gameboardLevel, levelData: levelCharacters };
      dispatch(setLevelData(levelData));
    }
  }, [levelCharacters]);

  if (storeLevels[gameboardLevel])
    return (
      <>
        <Header />
        <main>
          <TestButton level={storeLevels} />
          <GameBoard
            boardImg={GAMEBOARD_IMG_LVLS.lvl1}
            boardImgAlt="Game Board"
          />
        </main>
      </>
    );
}

export default App;
