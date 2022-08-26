import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../utils/api';
import { AppThunk, RootState } from '../store';
import { selectUser } from './userSlice';

export interface AccountState {
  data: any;
  statusAccount: 'idle' | 'loading' | 'failed';
  name: string;
  isNameError: boolean;
  password: string;
  isPasswordError: boolean;
  typeInputPassword: 'text' | 'password';
  isShowErrors: boolean;
  isFileError: boolean;
  avatar: string;
  isFormEdit: boolean;
}

const initialState: AccountState = {
  data: null,
  statusAccount: 'idle',
  name: '',
  isNameError: false,
  password: '',
  isPasswordError: false,
  typeInputPassword: 'password',
  isShowErrors: false,
  isFileError: false,
  avatar: '',
  isFormEdit: false,
};

export const patchUser = createAsyncThunk(
  'account/patchUser',
  async (data: {
    id: string;
    name: string;
    password: string;
    avatar: string;
  }) => {
    const response = await api.patchUser(data);
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

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setIsNameErrorAccount: (state, action: PayloadAction<boolean>) => {
      state.isNameError = action.payload;
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
    setIsFileError: (state, action: PayloadAction<boolean>) => {
      state.isFileError = action.payload;
    },
    setAvatar: (state, action: PayloadAction<string>) => {
      state.avatar = action.payload;
    },
    setIsFormEdit: (state, action: PayloadAction<boolean>) => {
      state.isFormEdit = action.payload;
    },
    resetForm: (state) => {
      state.data = null;
      state.statusAccount = 'idle';
      state.name = '';
      state.isNameError = false;
      state.password = '';
      state.isPasswordError = false;
      state.typeInputPassword = 'password';
      state.isShowErrors = false;
      state.isFileError = false;
      state.avatar = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(patchUser.pending, (state) => {
        state.statusAccount = 'loading';
      })
      .addCase(patchUser.fulfilled, (state, action) => {
        state.statusAccount = 'idle';
        state.data = action.payload;
      })
      .addCase(patchUser.rejected, (state) => {
        state.statusAccount = 'failed';
      });
  },
});

export const {
  setName,
  setPassword,
  setIsPasswordError,
  setTypeInputPassword,
  setIsShowErrors,
  setIsNameErrorAccount,
  setIsFileError,
  setAvatar,
  setIsFormEdit,
} = accountSlice.actions;

export const selectAccount = (state: RootState) => state.account;

export const runFormSubmitAccount = (): AppThunk => (dispatch, getState) => {
  const currentState = selectAccount(getState());
  dispatch(setIsShowErrors(true));
  currentState.isNameError || !currentState.name
    ? dispatch(setIsNameErrorAccount(true))
    : dispatch(setIsNameErrorAccount(false));
  currentState.isPasswordError || !currentState.password
    ? dispatch(setIsPasswordError(true))
    : dispatch(setIsPasswordError(false));
  if (currentState.avatar) {
    dispatch(setIsFileError(false));
  } else {
    dispatch(setIsFileError(true));
  }

  const newCurrentState = selectAccount(getState());
  const { isFileError, isNameError, isPasswordError } = newCurrentState;

  if (!isFileError && !isNameError && !isPasswordError) {
    const { name, password, avatar } = selectAccount(getState());
    const { _id } = selectUser(getState()).user;
    dispatch(patchUser({ id: _id, name, password, avatar }));
  }
};

export default accountSlice.reducer;
