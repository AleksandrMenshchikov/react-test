import styles from './Index.module.css';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import {
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
  selectIndex,
} from '../../redux/features/indexSlice';

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
    isFormValidity,
  } = useSelector(selectIndex);
  const dispatch = useDispatch();
  const refName = useRef<HTMLInputElement>(null);

  function handleFormSubmit(evt: {
    preventDefault: () => void;
    currentTarget: { checkValidity: () => boolean };
  }) {
    evt.preventDefault();
    dispatch(setIsFormValidity(evt.currentTarget.checkValidity()));
    refName.current?.checkValidity()
      ? dispatch(setIsNameError(false))
      : dispatch(setIsNameError(true));
  }

  function handleNameChange(evt: {
    currentTarget: { value: string; checkValidity: () => boolean };
  }) {
    dispatch(setName(evt.currentTarget.value));
    if (!isFormValidity) {
      evt.currentTarget.checkValidity()
        ? dispatch(setIsNameError(false))
        : dispatch(setIsNameError(true));
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.innerWrapper}>
        <h2 className={styles.title}>Регистрация</h2>
        <form className={styles.form} onSubmit={handleFormSubmit} noValidate>
          <FormControl fullWidth>
            <InputLabel htmlFor="name">Имя</InputLabel>
            <OutlinedInput
              inputRef={refName}
              error={isNameError}
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              label="Имя"
              autoFocus
              autoComplete="off"
              required
            />
            <FormHelperText
              error
              className={`${styles.errorInput} ${
                isNameError && styles.errorInput_active
              }`}
            >
              Заполните поле
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
