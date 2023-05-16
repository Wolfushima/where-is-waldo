import React, { useState } from 'react';
import Wrapper from '../components/Wrapper';
import GAMEBOARD_IMAGE_LEVELS from '../data/gameboard-image-levels';

export default function Leaderboard() {
  const [activeLevel, setActiveLevel] = useState('Level 1');

  const handleActiveLevel = (level) => {
    setActiveLevel(level);
  };

  return (
    <div id="leaderboard" className="leaderboard">
      <Wrapper className="leaderboard">
        <h2 className="leaderboard__header">LEADERBOARD</h2>
        <section className="leaderboard__levels">
          {Object.values(GAMEBOARD_IMAGE_LEVELS).map((value) => {
            return (
              <button
                className={
                  activeLevel === value.level
                    ? 'leaderboard__level active'
                    : 'leaderboard__level'
                }
                key={value.level}
                onClick={() => handleActiveLevel(value.level)}
                type="button"
              >
                <p>{value.levelNumber}</p>
                <img src={value.src} alt={value.level} />
              </button>
            );
          })}
        </section>
        <table className="leaderboard__leaderboard-table">
          <thead>
            <tr className="tr-active-level">
              <th colSpan={3}>{activeLevel}</th>
            </tr>
            <tr className="tr-headers">
              <th>Rank</th>
              <th>Username</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>RandomUsername1</td>
              <td>10.10</td>
            </tr>
            <tr>
              <td>2</td>
              <td>RandomUsername2</td>
              <td>9.10</td>
            </tr>
            <tr>
              <td>3</td>
              <td>RandomUsername3</td>
              <td>8.10</td>
            </tr>
            <tr>
              <td>4</td>
              <td>RandomUsername4</td>
              <td>7.10</td>
            </tr>
          </tbody>
        </table>
      </Wrapper>
    </div>
  );
}
