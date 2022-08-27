import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../utils/api';
import { AppThunk, RootState } from '../store';
import { selectUser } from './userSlice';

export interface PeopleState {
  data: any;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: PeopleState = {
  data: null,
  status: 'idle',
};

export const getUsers = createAsyncThunk(
  'people/getUsers',
  async (data: { id: string }) => {
    const response = await api.getUsers(data);
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

export const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    resetDataPeople: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload;
      })
      .addCase(getUsers.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { resetDataPeople } = peopleSlice.actions;

export const selectPeople = (state: RootState) => state.people;

export const runGetUsers = (): AppThunk => (dispatch, getState) => {
  const { _id } = selectUser(getState()).user;
  dispatch(getUsers({ id: _id }));
};

export default peopleSlice.reducer;
