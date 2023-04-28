import { createSlice } from '@reduxjs/toolkit';

export const levelsSlice = createSlice({
  name: 'levels',
  initialState: {},
  reducers: {
    setLevelData: (state, action) => {
      const { level, levelData } = action.payload;
      const levelExist = level in state;
      if (levelExist) {
        return;
      }
      const CHARACTERS_POSITION_BOUNDS = levelData.reduce(
        (prev, { CHARACTER_ID, CHARACTER_POSITION_BOUNDS }) => ({
          ...prev,
          [CHARACTER_ID]: CHARACTER_POSITION_BOUNDS,
        }),
        {}
      );
      state[level] = { CHARACTERS_POSITION_BOUNDS };
    },
  },
});

export const { setLevelData } = levelsSlice.actions;
export default levelsSlice.reducer;
