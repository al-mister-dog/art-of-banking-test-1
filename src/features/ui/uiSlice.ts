import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { state } from "./initialState";

const initialState = state;

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleTextExpanded: (state, { payload }) => {
      state.textExpanded = payload.textExpanded;
      console.log(state.textExpanded)
    },
  },
});

export const { toggleTextExpanded } = uiSlice.actions;

export const selectUI = (state: RootState) => state.ui;

export default uiSlice.reducer;
