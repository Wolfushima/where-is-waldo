import React from 'react';
import { Link } from 'react-router-dom';
import Wrapper from '../components/Wrapper';
import HOME_IMAGE_LEVELS from '../data/home-image-levels';

export default function Home() {
  return (
    <div id="home" className="home">
      <Wrapper className="home">
        <section className="home__game-description">
          <h2>
            &ldquo;Welcome to &quot;Where&apos;s Waldo?&quot; - the photo
            tagging game that will test your observation skills!&rdquo;
          </h2>
          <p className="bold">Objective and Gameplay</p>
          <p>
            <span className="red">&#x2022;</span> In this game application,
            there are 6 different levels of increasing difficulty, each with a
            large photograph that contains Waldo, Wizard, Wilma, and Odlaw.
          </p>
          <p>
            <span className="red">&#x2022;</span> Your task is to locate each of
            these characters by clicking on the corresponding area of the photo
            and selecting the correct name from a list of possible options.
          </p>
          <p>
            <span className="red">&#x2022;</span> Once you find all characters
            in a level, you can register your highscore and move on to the next
            level.
          </p>
        </section>
        <section className="home__leaderboard">
          <Link to="leaderboard/LEVEL1">VIEW LEADERBOARD</Link>
        </section>
        <section className="home__game-levels">
          <h3>PLAY</h3>
          {Object.entries(HOME_IMAGE_LEVELS).map(([key, value], index) => {
            return (
              <Link
                to={`game/${key}`}
                className="home__game-level"
                key={`gameboard${index}`}
              >
                <p>{value.levelName}</p>
                <div className="home__game-img">
                  <img src={value.src} alt="Gameboard" />
                </div>
              </Link>
            );
          })}
        </section>
      </Wrapper>
    </div>
  );
}
