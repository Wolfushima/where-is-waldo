import React from 'react';
import Header from './components/Header';
import GameBoard from './components/gameboard/GameBoard';
import GAMEBOARD_IMG_LVLS from './data/gameboard-img-lvls';

function App() {
  return (
    <>
      <Header />
      <main>
        <GameBoard
          boardImg={GAMEBOARD_IMG_LVLS.lvl1}
          boardImgAlt="Game Board"
        />
      </main>
    </>
  );
}

export default App;
