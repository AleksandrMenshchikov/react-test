import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../utils/api';
import { AppThunk, RootState } from '../store';

export interface SigninState {
  data: any;
  statusSignin: 'idle' | 'loading' | 'failed';
  email: string;
  isEmailError: boolean;
  password: string;
  isPasswordError: boolean;
  typeInputPassword: 'text' | 'password';
  isShowErrors: boolean;
}

const initialState: SigninState = {
  data: null,
  statusSignin: 'idle',
  email: '',
  isEmailError: false,
  password: '',
  isPasswordError: false,
  typeInputPassword: 'password',
  isShowErrors: false,
};

export const authUser = createAsyncThunk(
  'signin/authUser',
  async (data: { email: string; password: string }) => {
    const response = await api.signin(data);
    await new Promise((resolve, reject) => {
      let timer = setTimeout(() => {
        resolve('result');
        clearTimeout(timer);
      }, 2000);
    });
    const result = await response.json();
    return result;
  }
);

export const signinSlice = createSlice({
  name: 'signin',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setIsEmailError: (state, action: PayloadAction<boolean>) => {
      state.isEmailError = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setIsPasswordError: (state, action: PayloadAction<boolean>) => {
      state.isPasswordError = action.payload;
    },

    setTypeInputPassword: (
      state,
      action: PayloadAction<'text' | 'password'>
    ) => {
      state.typeInputPassword = action.payload;
    },
    setIsShowErrors: (state, action: PayloadAction<boolean>) => {
      state.isShowErrors = action.payload;
    },
    resetFormSignin: (state) => {
      state.data = null;
      state.statusSignin = 'idle';
      state.email = '';
      state.isEmailError = false;
      state.password = '';
      state.isPasswordError = false;
      state.typeInputPassword = 'password';
      state.isShowErrors = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authUser.pending, (state) => {
        state.statusSignin = 'loading';
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.statusSignin = 'idle';
        state.data = action.payload;
      })
      .addCase(authUser.rejected, (state) => {
        state.statusSignin = 'failed';
      });
  },
});

export const {
  setEmail,
  setPassword,
  setIsEmailError,
  setIsPasswordError,
  setTypeInputPassword,
  setIsShowErrors,
  resetFormSignin,
} = signinSlice.actions;

export const selectSignin = (state: RootState) => state.signin;

export const runFormSubmitSignin = (): AppThunk => (dispatch, getState) => {
  const currentState = selectSignin(getState());
  dispatch(setIsShowErrors(true));

  currentState.isEmailError || !currentState.email
    ? dispatch(setIsEmailError(true))
    : dispatch(setIsEmailError(false));
  currentState.isPasswordError || !currentState.password
    ? dispatch(setIsPasswordError(true))
    : dispatch(setIsPasswordError(false));

  const newCurrentState = selectSignin(getState());
  const { isEmailError, isPasswordError } = newCurrentState;

  if (!isEmailError && !isPasswordError) {
    const { email, password } = selectSignin(getState());
    dispatch(authUser({ email, password }));
  }
};

export default signinSlice.reducer;
