import styles from './Index.module.css';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  selectIndex,
  setIsFileError,
  runFormSubmit,
} from '../../redux/features/indexSlice';
import { useAppDispatch } from '../../redux/hooks';
import InputName from '../input-name/InputName';
import InputEmail from '../input-email/InputEmail';
import InputPassword from '../input-password/InputPassword';
import InputDateOfBirth from '../input-date-of-birth/InputDateOfBirth';
import InputGender from '../input-gender/InputGender';
import InputAvatar from '../input-avatar/InputAvatar';

function Index() {
  const { isShowErrors, avatar } = useSelector(selectIndex);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isShowErrors) {
      if (avatar) {
        dispatch(setIsFileError(false));
      } else {
        dispatch(setIsFileError(true));
      }
    } else {
      console.log('submit');
    }
  }, [isShowErrors, avatar, dispatch]);

  function handleFormSubmit(evt: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement;
  }) {
    evt.preventDefault();
    dispatch(runFormSubmit());
  }

  return (
    <div className={styles.container}>
      <div className={styles.innerWrapper}>
        <h2 className={styles.title}>Регистрация</h2>
        <form className={styles.form} onSubmit={handleFormSubmit} noValidate>
          <InputName />
          <InputEmail />
          <InputPassword />
          <InputDateOfBirth />
          <InputGender />
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
