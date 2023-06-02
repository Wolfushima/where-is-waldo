import React from 'react';
import Wrapper from '../components/Wrapper';
import HomeGameDescription from '../components/home/HomeGameDescription';
import HomeLeaderboard from '../components/home/HomeLeaderboard';
import HomeGameLevels from '../components/home/HomeGameLevels';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div id="home" className="home">
      <Wrapper className="home">
        <HomeGameDescription />
        <HomeLeaderboard />
        <HomeGameLevels />
      </Wrapper>
      <Footer />
    </div>
  );
}
