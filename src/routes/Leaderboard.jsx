import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Wrapper from '../components/Wrapper';
import GAMEBOARD_IMAGE_LEVELS from '../data/gameboard-image-levels';
import { useFetchLevelLeaderboardQuery } from '../services/firebase/firestoreApi';
import LeaderboardTable from '../components/leaderboard/LeaderboardTable';

export default function Leaderboard() {
  const { currentLevel } = useParams();
  const navigate = useNavigate();
  const [activeLevel, setActiveLevel] = useState(currentLevel);
  const { data: leaderboardData, isLoading } =
    useFetchLevelLeaderboardQuery(currentLevel);

  const handleActiveLevel = (level) => {
    setActiveLevel(level);
  };

  useEffect(() => {
    navigate(`/leaderboard/${activeLevel}`);
  }, [activeLevel]);

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
                <img src={value.src} alt={value.levelName} />
              </button>
            );
          })}
        </section>
        {isLoading && <p>loading...</p>}
        {leaderboardData && (
          <LeaderboardTable
            activeLevel={activeLevel}
            leaderboardData={leaderboardData}
          />
        )}
      </Wrapper>
    </div>
  );
}
