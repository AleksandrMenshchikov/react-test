import styles from './Account.module.css';
import React, { useEffect } from 'react';
import { Box, Modal } from '@mui/material';
import ModalMessage from '../modal-message/ModalMessage';
import { useAppDispatch } from '../../redux/hooks';
import { selectModal, setIsOpen } from '../../redux/features/modalSlice';
import { selectUser } from '../../redux/features/userSlice';
import { useSelector } from 'react-redux';

function Account() {
  const { isOpen } = useSelector(selectModal);
  const { user } = useSelector(selectUser);
  const dispatch = useAppDispatch();

  function handleModalClose() {
    dispatch(setIsOpen(false));
  }

  useEffect(() => {
    if (user) {
      dispatch(setIsOpen(true));
    }
  }, []);

  return (
    <div>
      <div>Account</div>
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
