import styles from './ModalMessage.module.css';
import React from 'react';
import Box from '@mui/material/Box';
import { selectModal } from '../../redux/features/modalSlice';
import { useSelector } from 'react-redux';

function ModalMessage() {
  const { isSuccess, message } = useSelector(selectModal);

  return (
    <Box
      className={`${styles.modalInner} ${
        !isSuccess && styles.modalInner_error
      }`}
    >
      {message}
    </Box>
  );
}

export default React.memo(ModalMessage);
