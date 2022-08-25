import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../utils/api';
import { AppThunk, RootState } from '../store';

export interface IndexState {
  data: object | null;
  status: 'idle' | 'loading' | 'failed';
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
  data: null,
  status: 'idle',
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

export const createUser = createAsyncThunk(
  'index/postUser',
  async (data: {
    name: string;
    email: string;
    password: string;
    dateOfBirth: number | null | Date;
    gender: string;
    avatar: string;
  }) => {
    const response = await api.postSignup(data);
    await new Promise((resolve, reject) => {
      let timer = setTimeout(() => {
        resolve('result');
        clearTimeout(timer);
      }, 5000);
    });
    const result = await response.json();
    return result;
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload;
      })
      .addCase(createUser.rejected, (state) => {
        state.status = 'failed';
      });
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
    const { name, email, password, dateOfBirth, gender, avatar } = selectIndex(
      getState()
    );
    dispatch(
      createUser({ name, email, password, dateOfBirth, gender, avatar })
    );
  }
};

export default indexSlice.reducer;
