import styles from './Index.module.css';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  setIsFileError,
  runFormSubmit,
  resetForm,
  selectSignup,
} from '../../redux/features/signupSlice';
import {
  selectModal,
  setIsOpen,
  setMessage,
  setIsSuccess,
} from '../../redux/features/modalSlice';
import { runFormSubmitSignin } from '../../redux/features/signinSlice';
import { setUser } from '../../redux/features/userSlice';
import { useAppDispatch } from '../../redux/hooks';
import InputName from '../input-name/InputName';
import InputEmail from '../input-email/InputEmail';
import InputPassword from '../input-password/InputPassword';
import InputDateOfBirth from '../input-date-of-birth/InputDateOfBirth';
import InputGender from '../input-gender/InputGender';
import InputAvatar from '../input-avatar/InputAvatar';
import ModalMessage from '../modal-message/ModalMessage';
import InputEmailSignin from '../input-email-signin/InputEmailSignin';
import InputPasswordSignin from '../input-password-signin/InputPasswordSignin';

function Index() {
  const {
    isShowErrors: isShowErrorsSignup,
    avatar,
    status: statusSignup,
    data,
  } = useSelector(selectSignup);
  const { isOpen } = useSelector(selectModal);
  const dispatch = useAppDispatch();
  const [isFormSignin, setIsFormSignin] = useState(true);

  useEffect(() => {
    if (isShowErrorsSignup) {
      if (avatar) {
        dispatch(setIsFileError(false));
      } else {
        dispatch(setIsFileError(true));
      }
    }
  }, [isShowErrorsSignup, avatar, dispatch]);

  useEffect(() => {
    if (data?.data && statusSignup === 'idle') {
      dispatch(setIsOpen(true));
      dispatch(setMessage('Вы успешно зарегистрированы'));
      dispatch(setIsSuccess(true));
      dispatch(setUser(data.data));
      dispatch(resetForm());
    } else if (data?.message && statusSignup === 'idle') {
      dispatch(setIsOpen(true));
      dispatch(setMessage(data.message));
      dispatch(setIsSuccess(false));
    }
    if (statusSignup === 'failed') {
      dispatch(setIsOpen(true));
      dispatch(setMessage('Что-то пошло не так'));
      dispatch(setIsSuccess(false));
    }
  }, [data, dispatch, statusSignup]);

  function handleFormSubmit(evt: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement;
  }) {
    evt.preventDefault();
    dispatch(runFormSubmit());
  }

  function handleFormSubmitSignin(evt: { preventDefault: () => void }) {
    evt.preventDefault();
    dispatch(runFormSubmitSignin());
  }

  function handleModalClose() {
    dispatch(setIsOpen(false));
  }

  return (
    <div className={styles.container}>
      <div className={styles.innerWrapper}>
        {isFormSignin ? (
          <>
            <h2 className={styles.title}>Авторизация</h2>
            <form
              className={styles.form}
              noValidate
              onSubmit={handleFormSubmitSignin}
            >
              <InputEmailSignin />
              <InputPasswordSignin />
              {statusSignup === 'loading' ? (
                <LoadingButton
                  loading
                  variant="outlined"
                  className={styles.buttonLoading}
                />
              ) : (
                <Button
                  variant="contained"
                  type="submit"
                  className={styles.button}
                >
                  Войти
                </Button>
              )}
            </form>
            <div className={styles.bottomBlock}>
              <span>
                Нет аккаунта?{' '}
                <Button
                  variant="outlined"
                  onClick={() => setIsFormSignin(false)}
                >
                  Зарегистрироваться
                </Button>
              </span>
            </div>
          </>
        ) : (
          <>
            <h2 className={styles.title}>Регистрация</h2>
            <form
              className={styles.form}
              onSubmit={handleFormSubmit}
              noValidate
            >
              <InputName />
              <InputEmail />
              <InputPassword />
              <InputDateOfBirth />
              <InputGender />
              <InputAvatar />
              {statusSignup === 'loading' ? (
                <LoadingButton
                  loading
                  variant="outlined"
                  className={styles.buttonLoading}
                />
              ) : (
                <Button
                  variant="contained"
                  type="submit"
                  className={styles.button}
                >
                  Зарегистрироваться
                </Button>
              )}
            </form>
            <div className={styles.bottomBlock}>
              <span>
                Уже есть аккаунт?{' '}
                <Button
                  disabled={statusSignup === 'loading'}
                  variant="outlined"
                  onClick={() => setIsFormSignin(true)}
                >
                  Войти
                </Button>
              </span>
            </div>
          </>
        )}
      </div>

      <Modal
        open={isOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <ModalMessage />
        </Box>
      </Modal>
    </div>
  );
}

export default Index;
