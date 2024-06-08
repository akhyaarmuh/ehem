import { createSlice } from '@reduxjs/toolkit';

export interface SettingsState {
  isSidenavOpen: boolean;
}

const initialState: SettingsState = {
  isSidenavOpen: true,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleSidenav(state) {
      state.isSidenavOpen = !state.isSidenavOpen;
    },
  },
});

export const { toggleSidenav } = settingsSlice.actions;
export default settingsSlice.reducer;
