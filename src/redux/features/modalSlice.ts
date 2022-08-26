import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface ModalState {
  isOpen: boolean;
  isSuccess: boolean;
  message: string;
}

const initialState: ModalState = {
  isOpen: false,
  isSuccess: false,
  message: '',
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    setIsSuccess: (state, action: PayloadAction<boolean>) => {
      state.isSuccess = action.payload;
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
  },
});

export const { setIsOpen, setIsSuccess, setMessage } = modalSlice.actions;

export const selectModal = (state: RootState) => state.modal;

export default modalSlice.reducer;
