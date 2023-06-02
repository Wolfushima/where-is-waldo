import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Wrapper from '../components/Wrapper';
import HOME_IMAGE_LEVELS from '../data/home-image-levels';
import { useFetchLevelLeaderboardQuery } from '../services/firebase/firestoreApi';
import LeaderboardTable from '../components/leaderboard/LeaderboardTable';
import LeaderboardImageButton from '../components/leaderboard/LeaderboardImageButton';
import Footer from '../components/Footer';

export default function Leaderboard() {
  const { currentLevel } = useParams();
  const navigate = useNavigate();
  const [activeLevel, setActiveLevel] = useState(currentLevel);
  const { data: leaderboardData, isLoading } =
    useFetchLevelLeaderboardQuery(currentLevel);

  useEffect(() => {
    navigate(`/leaderboard/${activeLevel}`);
  }, [activeLevel]);

  return (
    <div id="leaderboard" className="leaderboard">
      <Wrapper className="leaderboard">
        <h2 className="leaderboard__header">LEADERBOARD</h2>
        <section className="leaderboard__levels">
          {Object.values(HOME_IMAGE_LEVELS).map((image) => (
            <LeaderboardImageButton
              activeLevel={activeLevel}
              setActiveLevel={setActiveLevel}
              image={image}
              key={image.level}
            />
          ))}
        </section>
        {isLoading && <p>loading...</p>}
        {leaderboardData && (
          <LeaderboardTable
            activeLevel={activeLevel}
            leaderboardData={leaderboardData}
          />
        )}
      </Wrapper>
      <Footer />
    </div>
  );
}
