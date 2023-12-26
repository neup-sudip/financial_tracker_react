import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      const { payload } = action;
      state.profile = payload;
    },
  },
  extraReducers: () => {},
});

export const { setProfile } = userSlice.actions;

export default userSlice.reducer;
