import styles from './InputAvatar.module.css';
import React, { useRef } from 'react';
import FormHelperText from '@mui/material/FormHelperText';
import emptyAvatar from '../../images/Empty-Avatar-Rund.png';
import upload from '../../images/upload.png';
import {
  selectIndex,
  setIsFileError,
  setIsFileInput,
} from '../../redux/features/indexSlice';
import { useAppDispatch } from '../../redux/hooks';
import { useSelector } from 'react-redux';

const InputAvatar = () => {
  const { isFileError } = useSelector(selectIndex);
  const dispatch = useAppDispatch();
  const refInputFile = useRef<HTMLInputElement>(null);
  const refAvatar = useRef<HTMLImageElement>(null);

  function handleInputFileChange(evt: { currentTarget: { files: any } }) {
    if (evt.currentTarget.files[0]) {
      dispatch(setIsFileInput(true));
      dispatch(setIsFileError(false));
      const url = window.URL.createObjectURL(evt.currentTarget.files[0]);
      if (refAvatar.current) {
        refAvatar.current.src = url;
      }
    }
  }

  return (
    <label htmlFor="file" className={styles.labelAvatar}>
      <input
        ref={refInputFile}
        name="file"
        id="file"
        type="file"
        accept="image/*"
        className={styles.inputFile}
        onChange={handleInputFileChange}
        required
      />
      <img
        ref={refAvatar}
        src={emptyAvatar}
        alt="Фото пользователя"
        className={styles.avatar}
      />
      <img alt="Upload" src={upload} className={styles.editIcon} />
      <FormHelperText
        error
        className={`${styles.errorInput} ${
          isFileError && styles.errorInput_active
        }`}
        sx={{ marginBottom: '10px', textAlign: 'center' }}
      >
        Загрузите фото
      </FormHelperText>
    </label>
  );
};

export default React.memo(InputAvatar);
