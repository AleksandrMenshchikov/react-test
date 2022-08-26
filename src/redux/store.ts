import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import indexReducer from './features/indexSlice';
import modalReducer from './features/modalSlice';
import userReducer from './features/userSlice';

export const store = configureStore({
  reducer: {
    index: indexReducer,
    modal: modalReducer,
    user: userReducer,
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
