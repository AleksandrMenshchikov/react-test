import styles from './Account.module.css';
import React, { useEffect } from 'react';
import { Box, Modal } from '@mui/material';
import Button from '@mui/material/Button';
import ModalMessage from '../modal-message/ModalMessage';
import { useAppDispatch } from '../../redux/hooks';
import { selectModal, setIsOpen } from '../../redux/features/modalSlice';
import { selectUser } from '../../redux/features/userSlice';
import { useSelector } from 'react-redux';
import InputNameAccount from '../input-name-account/InputNameAccount';
import InputPasswordAccount from '../input-password-account/InputPasswordAccount';
import InputAvatarAccount from '../input-avatar-account/InputAvatarAccount';
import {
  selectAccount,
  setAvatar,
  setIsFormEdit,
  setName,
  setPassword,
  runFormSubmitAccount,
} from '../../redux/features/accountSlice';

function Account() {
  const { isOpen } = useSelector(selectModal);
  const { user } = useSelector(selectUser);
  const { isFormEdit } = useSelector(selectAccount);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      dispatch(setIsOpen(true));
    }
  }, []);

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
            >
              Редактировать
            </Button>
            <Button
              variant="outlined"
              type="button"
              disabled={!isFormEdit}
              onClick={handleCancelButtonClick}
            >
              Отменить
            </Button>
            <Button
              variant="contained"
              color="success"
              type="submit"
              disabled={!isFormEdit}
            >
              Сохранить
            </Button>
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
