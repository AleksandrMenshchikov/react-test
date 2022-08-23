import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface IndexState {
  name: string;
  isNameError: boolean;
  email: string;
  isEmailError: boolean;
  password: string;
  isPasswordError: boolean;
  dateOfBirth: string;
  isDateOfBirthError: boolean;
  gender: string;
  isGenderError: boolean;
  image: string;
  isImageError: boolean;
  isFormValidity: boolean;
}

const initialState: IndexState = {
  name: '',
  isNameError: false,
  email: '',
  isEmailError: false,
  password: '',
  isPasswordError: false,
  dateOfBirth: '',
  isDateOfBirthError: false,
  gender: '',
  isGenderError: false,
  image: '',
  isImageError: false,
  isFormValidity: true,
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
    setDateOfBirth: (state, action: PayloadAction<string>) => {
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
    setIsFormValidity: (state, action: PayloadAction<boolean>) => {
      state.isFormValidity = action.payload;
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
  setIsFormValidity,
} = indexSlice.actions;

export const selectIndex = (state: RootState) => state.index;

export default indexSlice.reducer;
