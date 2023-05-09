import React from 'react';

const GameBoardOverview = ({ handleStart }) => (
  <div className="gameboard__overview">
    <p>Click the Start button below to begin.</p>
    <p className="italic">
      (The clock will be running, so see how quickly you can find all the
      characters and register your high score!)
    </p>
    <button type="button" onClick={handleStart}>
      START
    </button>
  </div>
);

export default GameBoardOverview;
