import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import signupReducer from './features/signupSlice';
import signinReducer from './features/signinSlice';
import modalReducer from './features/modalSlice';
import userReducer from './features/userSlice';
import accountReducer from './features/accountSlice';
import peopleReducer from './features/peopleSlice';

export const store = configureStore({
  reducer: {
    signup: signupReducer,
    modal: modalReducer,
    user: userReducer,
    signin: signinReducer,
    account: accountReducer,
    people: peopleReducer,
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
