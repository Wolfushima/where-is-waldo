import React, { useEffect, useState } from 'react';

export default function LeaderboardTable({ activeLevel, leaderboardData }) {
  const [tableHeaderNumber, setTableHeaderNumber] = useState('');

  useEffect(() => {
    const inputString = activeLevel;
    const inputStringNumber = inputString.match(/\d+/)[0];
    setTableHeaderNumber(inputStringNumber);
  }, [activeLevel]);

  return (
    <table className="leaderboard__leaderboard-table">
      <colgroup>
        <col />
        <col />
        <col />
      </colgroup>
      <thead>
        <tr className="tr-active-level">
          <th colSpan={3}>{`LEVEL ${tableHeaderNumber}`}</th>
        </tr>
        <tr className="tr-headers">
          <th>Rank</th>
          <th>Username</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {leaderboardData.map(({ USERNAME, SCORE }, index) => (
          <tr key={index + USERNAME}>
            <td>{index + 1}</td>
            <td>{USERNAME}</td>
            <td>{SCORE}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
