import React from 'react';
import { Link } from 'react-router-dom';

export default function HomeLeaderboard() {
  return (
    <section className="home__leaderboard">
      <Link to="leaderboard/LEVEL1">VIEW LEADERBOARD</Link>
    </section>
  );
}
