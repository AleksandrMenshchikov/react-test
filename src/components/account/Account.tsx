import styles from './Account.module.css';
import React, { useEffect } from 'react';
import { Box, Modal } from '@mui/material';
import Button from '@mui/material/Button';
import ModalMessage from '../modal-message/ModalMessage';
import { useAppDispatch } from '../../redux/hooks';
import { selectModal, setIsOpen } from '../../redux/features/modalSlice';
import { selectUser } from '../../redux/features/userSlice';
import { useSelector } from 'react-redux';

function Account() {
  const { isOpen } = useSelector(selectModal);
  const { user } = useSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      dispatch(setIsOpen(true));
    }
  }, []);

  function handleModalClose() {
    dispatch(setIsOpen(false));
  }

  function handleFormSubmit(evt: any) {}

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
        <form
          className={styles.form}
          onSubmit={handleFormSubmit}
          noValidate
        ></form>
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
