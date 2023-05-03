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
      state[level] = {
        CURRENT_LEVEL: level,
        GAME_OVER: false,
        CHARACTERS_STATUS,
        CHARACTERS,
      };
    },
    setCharacterStatus: (state, action) => {
      const { level, character } = action.payload;
      state[level].CHARACTERS_STATUS[character].isFound = true;
    },
    setGameOver: (state, action) => {
      const level = action.payload;
      state[level].GAME_OVER = true;
    },
  },
});

export const { setNewGame, setCharacterStatus, setGameOver } =
  currentGameSlice.actions;
export default currentGameSlice.reducer;
