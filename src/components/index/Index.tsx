import styles from './Index.module.css';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { useEffect } from 'react';
import {
  setIsNameError,
  setIsEmailError,
  setIsPasswordError,
  setIsDateOfBirthError,
  setIsShowErrors,
  selectIndex,
  setIsGenderError,
  setIsFileError,
} from '../../redux/features/indexSlice';
import { useAppDispatch } from '../../redux/hooks';
import InputName from '../input-name/InputName';
import InputEmail from '../input-email/InputEmail';
import InputPassword from '../input-password/InputPassword';
import InputDateOfBirth from '../input-date-of-birth/InputDateOfBirth';
import InputGender from '../input-gender/InputGender';
import InputAvatar from '../input-avatar/InputAvatar';

function Index() {
  const { dateOfBirth, isDateOfBirthError, gender, isShowErrors, isFileInput } =
    useSelector(selectIndex);
  const dispatch = useAppDispatch();
  const refName = useRef<HTMLInputElement>(null);
  const refEmail = useRef<HTMLInputElement>(null);
  const refPassword = useRef<HTMLInputElement>(null);
  const refGender = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isShowErrors) {
      if (isFileInput) {
        dispatch(setIsFileError(false));
      } else {
        dispatch(setIsFileError(true));
      }
    }
  }, [isShowErrors, isFileInput, dispatch]);

  function handleFormSubmit(evt: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement;
  }) {
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
    isDateOfBirthError || !dateOfBirth
      ? dispatch(setIsDateOfBirthError(true))
      : dispatch(setIsDateOfBirthError(false));
    gender
      ? dispatch(setIsGenderError(false))
      : dispatch(setIsGenderError(true));
    if (isFileInput) {
      dispatch(setIsFileError(false));
    } else {
      dispatch(setIsFileError(true));
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.innerWrapper}>
        <h2 className={styles.title}>Регистрация</h2>
        <form className={styles.form} onSubmit={handleFormSubmit} noValidate>
          <InputName ref={refName} />
          <InputEmail ref={refEmail} />
          <InputPassword ref={refPassword} />
          <InputDateOfBirth />
          <InputGender ref={refGender} />
          <InputAvatar />
          <Button variant="contained" type="submit" className={styles.button}>
            Зарегистрироваться
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Index;
