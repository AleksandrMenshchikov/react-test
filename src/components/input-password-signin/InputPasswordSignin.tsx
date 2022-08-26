import styles from './InputPasswordSignin.module.css';
import React from 'react';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  selectSignin,
  setPassword,
  setIsPasswordError,
  setTypeInputPassword,
} from '../../redux/features/signinSlice';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/hooks';

const InputPassword = () => {
  const {
    password,
    isPasswordError,
    typeInputPassword,
    isShowErrors,
    statusSignin,
  } = useSelector(selectSignin);
  const dispatch = useAppDispatch();

  function handlePasswordChange(evt: {
    currentTarget: { value: string; checkValidity: () => boolean };
  }) {
    dispatch(setPassword(evt.currentTarget.value.trimStart()));
    if (isShowErrors) {
      evt.currentTarget.checkValidity()
        ? dispatch(setIsPasswordError(false))
        : dispatch(setIsPasswordError(true));
    }
  }

  function handleShowPasswordClick() {
    if (typeInputPassword === 'text') {
      dispatch(setTypeInputPassword('password'));
    } else {
      dispatch(setTypeInputPassword('text'));
    }
  }

  function handlePasswordMouseDown(evt: { preventDefault: () => void }) {
    evt.preventDefault();
  }

  return (
    <FormControl fullWidth>
      <TextField
        disabled={statusSignin === 'loading'}
        variant="outlined"
        error={isPasswordError}
        type={typeInputPassword}
        id="password"
        value={password}
        onChange={handlePasswordChange}
        label="Пароль"
        required
        placeholder="минимум 6 символов"
        inputProps={{
          minLength: 6,
          maxLength: 100,
        }}
        autoComplete="current-password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleShowPasswordClick}
                onMouseDown={handlePasswordMouseDown}
                edge="end"
              >
                {typeInputPassword === 'password' ? (
                  <VisibilityOff />
                ) : (
                  <Visibility />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <FormHelperText
        error
        className={`${styles.errorInput} ${
          isPasswordError && styles.errorInput_active
        }`}
        sx={{ marginBottom: '10px' }}
      >
        Заполните поле (минимум 6 символов)
      </FormHelperText>
    </FormControl>
  );
};

export default React.memo(InputPassword);
