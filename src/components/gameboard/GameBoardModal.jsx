import React from 'react';

export default function GameBoardModal() {
  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="gameboard__modal">
      <div className="gameboard__modal-content">
        <header>
          <h1>CONGRATULATIONS!</h1>
          <p>You found Waldo and his friends!</p>
          <span>
            Enter your username to submit your score to the leaderboard.
          </span>
        </header>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="username">
            Username{' '}
            <input
              type="text"
              name="username"
              id="username"
              autoComplete="off"
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
