import { createSlice } from '@reduxjs/toolkit';

export const currentGameSlice = createSlice({
  name: 'currentGame',
  initialState: {},
  reducers: {
    setNewGame: (state, action) => {
      const { level, levelData } = action.payload;
      const CHARACTERS_STATUS = levelData.reduce(
        (prev, { CHARACTER_ID }) => ({
          ...prev,
          [CHARACTER_ID]: {
            isFound: false,
          },
        }),
        {}
      );
      const CHARACTERS = levelData.map(({ CHARACTER_ID }) => CHARACTER_ID);
      const NEW_GAME = {
        [level]: {
          CURRENT_LEVEL: level,
          GAME_OVER: false,
          CHARACTERS_STATUS,
          CHARACTERS,
          DATE: null,
          SCORE: null,
        },
      };
      return NEW_GAME;
    },
    setCharacterStatus: (state, action) => {
      const { level, character } = action.payload;
      state[level].CHARACTERS_STATUS[character].isFound = true;
    },
    setGameOver: (state, action) => {
      const level = action.payload;
      state[level].GAME_OVER = true;
    },
    setDate: (state, action) => {
      const { level, date } = action.payload;
      state[level].DATE = date;
    },
    setScore: (state, action) => {
      const { level, score } = action.payload;
      state[level].SCORE = score;
    },
    resetGameToInitialState: () => {
      return {};
    },
  },
});

export const {
  setNewGame,
  setCharacterStatus,
  setGameOver,
  setDate,
  setScore,
  resetGameToInitialState,
} = currentGameSlice.actions;
export default currentGameSlice.reducer;
