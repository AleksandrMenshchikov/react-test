import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store';

export interface IndexState {
  name: string;
  isNameError: boolean;
  email: string;
  isEmailError: boolean;
  password: string;
  isPasswordError: boolean;
  dateOfBirth: string | object | null | Date;
  isDateOfBirthError: boolean;
  gender: string;
  isGenderError: boolean;
  image: string;
  isImageError: boolean;
  typeInputPassword: 'text' | 'password';
  isShowErrors: boolean;
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
  image: '',
  isImageError: false,
  typeInputPassword: 'password',
  isShowErrors: false,
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
    setDateOfBirth: (state, action: PayloadAction<string | object | null>) => {
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
    setImage: (state, action: PayloadAction<string>) => {
      state.image = action.payload;
    },
    setIsImageError: (state, action: PayloadAction<boolean>) => {
      state.isImageError = action.payload;
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
  },
});

export const {
  setName,
  setEmail,
  setPassword,
  setDateOfBirth,
  setGender,
  setImage,
  setIsNameError,
  setIsEmailError,
  setIsPasswordError,
  setIsDateOfBirthError,
  setIsGenderError,
  setIsImageError,
  setTypeInputPassword,
  setIsShowErrors,
} = indexSlice.actions;

export const selectIndex = (state: RootState) => state.index;

export default indexSlice.reducer;
