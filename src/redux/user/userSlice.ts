import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  id: string | null;
  full_name: string;
  email: string;
  role: 'owner' | 'admin' | 'cashier';
  shop: null | {
    name: string;
    no_hp: string;
    address: string;
    expired_at: string;
    foot_note?: string;
    pole_note?: string;
  };
  exp: number;
  accessToken: string;
}

const initialState: UserState = {
  id: null,
  full_name: '',
  email: '',
  role: 'cashier',
  shop: null,
  exp: 0,
  accessToken: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn(state, action: PayloadAction<UserState>) {
      state.id = action.payload.id;
      state.full_name = action.payload.full_name;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.shop = action.payload.shop;
    },
    signOut(state) {
      state.id = null;
      state.shop = null;
    },
    setAccessToken(state, action: PayloadAction<{ exp: number; accessToken: string }>) {
      state.exp = action.payload.exp;
      state.accessToken = action.payload.accessToken;
    },
  },
});

export const { signIn, signOut, setAccessToken } = userSlice.actions;
export default userSlice.reducer;
