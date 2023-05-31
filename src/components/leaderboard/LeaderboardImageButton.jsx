import React from 'react';

export default function LeaderboardImageButton({
  activeLevel,
  setActiveLevel,
  image,
}) {
  return (
    <button
      className={
        activeLevel === image.level
          ? 'leaderboard__level active'
          : 'leaderboard__level'
      }
      onClick={() => setActiveLevel(image.level)}
      type="button"
    >
      <p>{image.levelNumber}</p>
      <img src={image.src} alt={image.levelName} />
    </button>
  );
}
