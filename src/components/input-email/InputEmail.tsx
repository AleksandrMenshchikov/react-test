import styles from './InputEmail.module.css';
import React from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import { useSelector } from 'react-redux';
import {
  selectSignup,
  setEmail,
  setIsEmailError,
} from '../../redux/features/signupSlice';
import { useAppDispatch } from '../../redux/hooks';

const InputEmail = () => {
  const { email, isEmailError, isShowErrors, status } = useSelector(selectSignup);
  const dispatch = useAppDispatch();

  function handleEmailChange(evt: {
    currentTarget: { value: string; checkValidity: () => boolean };
  }) {
    dispatch(setEmail(evt.currentTarget.value.trimStart()));
    if (isShowErrors) {
      evt.currentTarget.checkValidity()
        ? dispatch(setIsEmailError(false))
        : dispatch(setIsEmailError(true));
    }
  }

  return (
    <FormControl fullWidth>
      <TextField
        disabled={status === 'loading'}
        variant="outlined"
        error={isEmailError}
        type="email"
        id="email"
        value={email}
        onChange={handleEmailChange}
        label="Email"
        required
        placeholder="name@example.com"
        autoComplete="email"
      />
      <FormHelperText
        error
        className={`${styles.errorInput} ${
          isEmailError && styles.errorInput_active
        }`}
        sx={{ marginBottom: '10px' }}
      >
        Заполните поле
      </FormHelperText>
    </FormControl>
  );
};

export default React.memo(InputEmail);
