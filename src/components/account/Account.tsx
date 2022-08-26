import styles from './Account.module.css';
import React, { useEffect } from 'react';
import { Box, Modal } from '@mui/material';
import Button from '@mui/material/Button';
import ModalMessage from '../modal-message/ModalMessage';
import { useAppDispatch } from '../../redux/hooks';
import {
  selectModal,
  setIsOpen,
  setIsSuccess,
  setMessage,
} from '../../redux/features/modalSlice';
import { selectUser, setUser } from '../../redux/features/userSlice';
import { useSelector } from 'react-redux';
import InputNameAccount from '../input-name-account/InputNameAccount';
import InputPasswordAccount from '../input-password-account/InputPasswordAccount';
import InputAvatarAccount from '../input-avatar-account/InputAvatarAccount';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  selectAccount,
  setAvatar,
  setIsFormEdit,
  setName,
  setPassword,
  runFormSubmitAccount,
  setIsNameErrorAccount,
  setIsPasswordError,
  setIsShowErrors,
} from '../../redux/features/accountSlice';

function Account() {
  const { isOpen } = useSelector(selectModal);
  const { user } = useSelector(selectUser);
  const { isFormEdit, statusAccount, data } = useSelector(selectAccount);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      dispatch(setIsOpen(true));
    }
  }, []);

  useEffect(() => {
    if (data?.data && statusAccount === 'idle') {
      dispatch(setIsOpen(true));
      dispatch(setMessage('Вы успешно обновили данные'));
      dispatch(setIsSuccess(true));
      dispatch(setUser(data.data));
      dispatch(setPassword(''));
      dispatch(setIsShowErrors(false));
    } else if (data?.message && statusAccount === 'idle') {
      dispatch(setIsOpen(true));
      dispatch(setMessage(data.message));
      dispatch(setIsSuccess(false));
    }
    if (statusAccount === 'failed') {
      dispatch(setIsOpen(true));
      dispatch(setMessage('Что-то пошло не так'));
      dispatch(setIsSuccess(false));
    }
  }, [data, dispatch, statusAccount]);

  function handleModalClose() {
    dispatch(setIsOpen(false));
  }

  function handleFormSubmit(evt: any) {
    evt.preventDefault();
    dispatch(runFormSubmitAccount());
  }

  function handleEditButtonClick() {
    dispatch(setIsFormEdit(true));
  }

  function handleCancelButtonClick() {
    dispatch(setIsFormEdit(false));
    dispatch(setName(user.name));
    dispatch(setPassword(''));
    dispatch(setAvatar(user.avatar));
    dispatch(setIsNameErrorAccount(false));
    dispatch(setIsPasswordError(false));
  }

  return (
    <div className={styles.container}>
      <div className={styles.innerWrapper}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>Аккаунт</h2>
          <Button
            sx={{ textTransform: 'none', fontSize: '1.8rem' }}
            variant="outlined"
          >
            Друзья
          </Button>
        </div>
        <form className={styles.form} onSubmit={handleFormSubmit} noValidate>
          <InputNameAccount />
          <InputPasswordAccount />
          <InputAvatarAccount />
          <div className={styles.buttonContainer}>
            <Button
              variant="contained"
              type="button"
              onClick={handleEditButtonClick}
              disabled={statusAccount === 'loading'}
            >
              Редактировать
            </Button>
            <Button
              variant="outlined"
              type="button"
              disabled={!isFormEdit || statusAccount === 'loading'}
              onClick={handleCancelButtonClick}
            >
              Отменить
            </Button>
            {statusAccount === 'loading' ? (
              <LoadingButton
                loading
                variant="outlined"
                className={styles.buttonLoading}
              />
            ) : (
              <Button
                variant="contained"
                color="success"
                type="submit"
                disabled={!isFormEdit}
              >
                Сохранить
              </Button>
            )}
          </div>
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

export default React.memo(Account);
