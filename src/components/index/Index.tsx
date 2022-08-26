import styles from './Index.module.css';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  selectIndex,
  setIsFileError,
  runFormSubmit,
  resetForm,
} from '../../redux/features/indexSlice';
import {
  selectModal,
  setIsOpen,
  setMessage,
  setIsSuccess,
} from '../../redux/features/modalSlice';
import { setUser } from '../../redux/features/userSlice';
import { useAppDispatch } from '../../redux/hooks';
import InputName from '../input-name/InputName';
import InputEmail from '../input-email/InputEmail';
import InputPassword from '../input-password/InputPassword';
import InputDateOfBirth from '../input-date-of-birth/InputDateOfBirth';
import InputGender from '../input-gender/InputGender';
import InputAvatar from '../input-avatar/InputAvatar';
import ModalMessage from '../modal-message/ModalMessage';

function Index() {
  const { isShowErrors, avatar, status, data } = useSelector(selectIndex);
  const { isOpen } = useSelector(selectModal);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isShowErrors) {
      if (avatar) {
        dispatch(setIsFileError(false));
      } else {
        dispatch(setIsFileError(true));
      }
    }
  }, [isShowErrors, avatar, dispatch]);

  useEffect(() => {
    if (data?.data && status === 'idle') {
      dispatch(setIsOpen(true));
      dispatch(setMessage('Вы успешно зарегистрированы'));
      dispatch(setIsSuccess(true));
      dispatch(setUser(data.data));
      dispatch(resetForm());
    } else if (data?.message && status === 'idle') {
      dispatch(setIsOpen(true));
      dispatch(setMessage(data.message));
      dispatch(setIsSuccess(false));
    }
    if (status === 'failed') {
      dispatch(setIsOpen(true));
      dispatch(setMessage('Что-то пошло не так'));
      dispatch(setIsSuccess(false));
    }
  }, [data, dispatch, status]);

  function handleFormSubmit(evt: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement;
  }) {
    evt.preventDefault();
    dispatch(runFormSubmit());
  }

  function handleModalClose() {
    dispatch(setIsOpen(false));
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
          {status === 'loading' ? (
            <LoadingButton
              loading
              variant="outlined"
              className={styles.buttonLoading}
            />
          ) : (
            <Button variant="contained" type="submit" className={styles.button}>
              Зарегистрироваться
            </Button>
          )}
        </form>
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
