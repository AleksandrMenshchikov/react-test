import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../store';

export interface IndexState {
  name: string;
  isNameError: boolean;
  email: string;
  isEmailError: boolean;
  password: string;
  isPasswordError: boolean;
  dateOfBirth: number | null | Date;
  isDateOfBirthError: boolean;
  gender: string;
  isGenderError: boolean;
  typeInputPassword: 'text' | 'password';
  isShowErrors: boolean;
  isFileError: boolean;
  avatar: string;
}

const initialState: IndexState = {
  name: '',
  isNameError: false,
  email: '',
  isEmailError: false,
  password: '',
  isPasswordError: false,
  dateOfBirth: null,
  isDateOfBirthError: false,
  gender: '',
  isGenderError: false,
  typeInputPassword: 'password',
  isShowErrors: false,
  isFileError: false,
  avatar: '',
};

export const indexSlice = createSlice({
  name: 'index',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setIsNameError: (state, action: PayloadAction<boolean>) => {
      state.isNameError = action.payload;
    },
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
    setDateOfBirth: (state, action: PayloadAction<number | null | Date>) => {
      state.dateOfBirth = action.payload;
    },
    setIsDateOfBirthError: (state, action: PayloadAction<boolean>) => {
      state.isDateOfBirthError = action.payload;
    },
    setGender: (state, action: PayloadAction<string>) => {
      state.gender = action.payload;
    },
    setIsGenderError: (state, action: PayloadAction<boolean>) => {
      state.isGenderError = action.payload;
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
  },
});

export const {
  setName,
  setEmail,
  setPassword,
  setDateOfBirth,
  setIsNameError,
  setIsEmailError,
  setIsPasswordError,
  setIsDateOfBirthError,
  setIsGenderError,
  setTypeInputPassword,
  setIsShowErrors,
  setGender,
  setIsFileError,
  setAvatar,
} = indexSlice.actions;

export const selectIndex = (state: RootState) => state.index;

export const postGender =
  (gender: string): AppThunk =>
  (dispatch, getState) => {
    dispatch(setGender(gender));
    const currentValue = selectIndex(getState());
    if (currentValue.isShowErrors) {
      currentValue.gender
        ? dispatch(setIsGenderError(false))
        : dispatch(setIsGenderError(true));
    }
  };

export const runFormSubmit = (): AppThunk => (dispatch, getState) => {
  const currentState = selectIndex(getState());
  dispatch(setIsShowErrors(true));
  currentState.isNameError || !currentState.name
    ? dispatch(setIsNameError(true))
    : dispatch(setIsNameError(false));
  currentState.isEmailError || !currentState.email
    ? dispatch(setIsEmailError(true))
    : dispatch(setIsEmailError(false));
  currentState.isPasswordError || !currentState.password
    ? dispatch(setIsPasswordError(true))
    : dispatch(setIsPasswordError(false));
  currentState.isDateOfBirthError || !currentState.dateOfBirth
    ? dispatch(setIsDateOfBirthError(true))
    : dispatch(setIsDateOfBirthError(false));
  currentState.gender
    ? dispatch(setIsGenderError(false))
    : dispatch(setIsGenderError(true));
  if (currentState.avatar) {
    dispatch(setIsFileError(false));
  } else {
    dispatch(setIsFileError(true));
  }

  const newCurrentState = selectIndex(getState());
  const {
    isDateOfBirthError,
    isEmailError,
    isFileError,
    isGenderError,
    isNameError,
    isPasswordError,
  } = newCurrentState;

  if (
    !isDateOfBirthError &&
    !isEmailError &&
    !isFileError &&
    !isGenderError &&
    !isNameError &&
    !isPasswordError
  ) {
    dispatch(setIsShowErrors(false));
  }
};

export default indexSlice.reducer;
