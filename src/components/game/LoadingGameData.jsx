import React from 'react';
import CHARACTERS from '../../data/characters';

export default function LoadingGameData() {
  return (
    <div className="gameboard__loading">
      <div className="gameboard__loading-wrapper">
        <div className="gameboard__loading-characters">
          {CHARACTERS.map((character) => {
            return (
              <div className="gameboard__loading-character" key={character.id}>
                <img src={character.src} alt={character.alt} />
              </div>
            );
          })}
        </div>
        <div className="gameboard__loading-bar">
          <p>Loading data...</p>
        </div>
      </div>
    </div>
  );
}
