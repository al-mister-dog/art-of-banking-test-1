import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import  playersReducer from '../features/players/playersSlice';

import fundamentalsReducer from '../features/moduleState/fundamentalsSlice'
import auxilliaryReducer from "../features/auxilliary/auxilliarySlice"

export const store = configureStore({
  reducer: {
     players:  playersReducer,
     partiesFundamentals: fundamentalsReducer,
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
