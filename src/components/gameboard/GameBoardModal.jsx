import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useUpdateLevelLeaderboardMutation } from '../../services/firebase/firestoreApi';

export default function GameBoardModal({ level }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const { SCORE } = useSelector((state) => state.currentGame[level]);
  const [updateLevelLeaderboard, { isSuccess }] =
    useUpdateLevelLeaderboardMutation();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Validates string with letter, alphanumeric, and single-space words.
    const regExp = /^(?=.*[A-Za-z])[A-Za-z0-9]+(?:\s[A-Za-z0-9]+)*$/;

    if (!regExp.test(username) || username.length > 20) return;
    updateLevelLeaderboard({ level, USERNAME: username, SCORE });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/leaderboard/');
    }
  }, [isSuccess]);

  return (
    <div className="gameboard__modal">
      <div className="gameboard__modal-content">
        <header>
          <h1>CONGRATULATIONS!</h1>
          <h2>You found Waldo and his friends!</h2>
          <p>Enter your username to submit your score to the leaderboard.</p>
        </header>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="username">
            Username{' '}
            <input
              type="text"
              name="username"
              id="username"
              autoComplete="off"
              onChange={(e) => setUsername(e.target.value.trim())}
            />
          </label>
          <button type="submit" id="submit">
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
}
