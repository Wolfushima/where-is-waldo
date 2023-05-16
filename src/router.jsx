import React from 'react';
import { createHashRouter } from 'react-router-dom';
import Root from './routes/root';
import ErrorPage from './routes/error-page';
import Home from './routes/Home';
import Game from './routes/Game';
import Leaderboard from './routes/Leaderboard';

const router = createHashRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'game/:level',
        element: <Game />,
      },
      {
        path: 'leaderboard',
        element: <Leaderboard />,
      },
    ],
  },
]);

export default router;
