import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import  playersReducer from '../features/players/playersSlice';

import lecturesReducer from '../features/lectures/lecturesSlice'
import auxilliaryReducer from "../features/auxilliary/auxilliarySlice"

export const store = configureStore({
  reducer: {
     players:  playersReducer,
     partiesLectures: lecturesReducer,
     auxilliary: auxilliaryReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
