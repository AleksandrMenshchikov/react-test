import styles from './Index.module.css';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ruLocale from 'date-fns/locale/ru';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import {
  setName,
  setEmail,
  setPassword,
  setDateOfBirth,
  setIsNameError,
  setIsEmailError,
  setIsPasswordError,
  setIsDateOfBirthError,
  setIsShowErrors,
  setGender,
  setImage,
  selectIndex,
  setTypeInputPassword,
} from '../../redux/features/indexSlice';
import { useAppDispatch } from '../../redux/hooks';

function Index() {
  const {
    name,
    isNameError,
    email,
    isEmailError,
    password,
    isPasswordError,
    dateOfBirth,
    isDateOfBirthError,
    gender,
    isGenderError,
    image,
    isImageError,
    typeInputPassword,
    isShowErrors,
  } = useSelector(selectIndex);
  const dispatch = useAppDispatch();
  const refName = useRef<HTMLInputElement>(null);
  const refEmail = useRef<HTMLInputElement>(null);
  const refPassword = useRef<HTMLInputElement>(null);
  const refDateOfBirth = useRef<HTMLInputElement>(null);

  function handleFormSubmit(evt: { preventDefault: () => void }) {
    evt.preventDefault();
    dispatch(setIsShowErrors(true));
    refName.current?.checkValidity()
      ? dispatch(setIsNameError(false))
      : dispatch(setIsNameError(true));
    refEmail.current?.checkValidity()
      ? dispatch(setIsEmailError(false))
      : dispatch(setIsEmailError(true));
    refPassword.current?.checkValidity()
      ? dispatch(setIsPasswordError(false))
      : dispatch(setIsPasswordError(true));
    refDateOfBirth.current?.checkValidity()
      ? dispatch(setIsDateOfBirthError(false))
      : dispatch(setIsDateOfBirthError(true));
  }

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

  function handleDateOfBirthChange(value: string | object | null | Date) {
    dispatch(setDateOfBirth(value));
  }

  return (
    <div className={styles.container}>
      <div className={styles.innerWrapper}>
        <h2 className={styles.title}>Регистрация</h2>
        <form className={styles.form} onSubmit={handleFormSubmit} noValidate>
          <FormControl fullWidth>
            <TextField
              variant="outlined"
              inputRef={refName}
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
          <FormControl fullWidth>
            <TextField
              variant="outlined"
              inputRef={refEmail}
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
          <FormControl fullWidth>
            <TextField
              variant="outlined"
              inputRef={refPassword}
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
          <FormControl fullWidth>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={ruLocale}
            >
              <DatePicker
                label="Дата рождения *"
                value={dateOfBirth}
                onChange={handleDateOfBirthChange}
                minDate={new Date('01-01-1920')}
                renderInput={(params) => {
                  if (
                    (!params.inputProps?.value || params.error) &&
                    isShowErrors
                  ) {
                    dispatch(setIsDateOfBirthError(true));
                  } else if (!params.inputProps?.value && isShowErrors) {
                    dispatch(setIsDateOfBirthError(true));
                  } else {
                    dispatch(setIsDateOfBirthError(false));
                  }
                  const newParams = {
                    ...params,
                    inputProps: {
                      ...params.inputProps,
                      placeholder: 'дд.мм.гггг',
                    },
                    error: isDateOfBirthError ? true : false,
                  };
                  return <TextField variant="outlined" {...newParams} />;
                }}
              />
            </LocalizationProvider>
            <FormHelperText
              error
              className={`${styles.errorInput} ${
                isDateOfBirthError && styles.errorInput_active
              }`}
              sx={{ marginBottom: '10px' }}
            >
              Заполните поле (дд.мм.гггг)
            </FormHelperText>
          </FormControl>

          <Button variant="contained" type="submit" className={styles.button}>
            Зарегистрироваться
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Index;
