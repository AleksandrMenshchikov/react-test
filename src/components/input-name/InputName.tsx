import styles from './InputName.module.css';
import React from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import { useSelector } from 'react-redux';
import {
  selectSignup,
  setName,
  setIsNameError,
} from '../../redux/features/signupSlice';
import { useAppDispatch } from '../../redux/hooks';

const InputName = () => {
  const { name, isNameError, isShowErrors, status } = useSelector(selectSignup);
  const dispatch = useAppDispatch();

  function handleNameChange(evt: {
    currentTarget: { value: string; checkValidity: () => boolean };
  }) {
    dispatch(setName(evt.currentTarget.value.trimStart()));
    if (isShowErrors) {
      evt.currentTarget.checkValidity()
        ? dispatch(setIsNameError(false))
        : dispatch(setIsNameError(true));
    }
  }

  return (
    <FormControl fullWidth>
      <TextField
        disabled={status === 'loading'}
        variant="outlined"
        error={isNameError}
        type="text"
        id="name"
        value={name}
        onChange={handleNameChange}
        label="Имя"
        autoFocus
        required
        inputProps={{ minLength: 2, maxLength: 100 }}
        autoComplete="name"
        placeholder="Имя"
      />
      <FormHelperText
        error
        className={`${styles.errorInput} ${
          isNameError && styles.errorInput_active
        }`}
        sx={{ marginBottom: '10px' }}
      >
        Заполните поле
      </FormHelperText>
    </FormControl>
  );
};

export default React.memo(InputName);
