import styles from './InputAvatar.module.css';
import React, { useEffect, useRef } from 'react';
import FormHelperText from '@mui/material/FormHelperText';
import emptyAvatar from '../../images/Empty-Avatar-Rund.png';
import upload from '../../images/upload.png';
import {
  selectSignup,
  setIsFileError,
  setAvatar,
} from '../../redux/features/signupSlice';
import { selectUser } from '../../redux/features/userSlice';
import { useAppDispatch } from '../../redux/hooks';
import { useSelector } from 'react-redux';
import { resizeFile } from '../../utils/image-resizer';

const InputAvatar = () => {
  const { isFileError, status, avatar } = useSelector(selectSignup);
  const { user } = useSelector(selectUser);
  const dispatch = useAppDispatch();
  const refInputFile = useRef<HTMLInputElement>(null);
  const refAvatar = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (user) {
      if (refAvatar.current) {
        refAvatar.current.src = emptyAvatar;
      }
    }
  }, [user]);

  async function handleInputFileChange(evt: any) {
    if (evt.target.files[0]) {
      const resizedAvatar: any = await resizeFile(evt.target.files[0]);
      dispatch(setAvatar(resizedAvatar));
      dispatch(setIsFileError(false));
      if (refAvatar.current) {
        refAvatar.current.src = avatar;
      }
    }
  }

  return (
    <>
      <label htmlFor="file" className={styles.labelAvatar}>
        <input
          disabled={status === 'loading'}
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
          src={avatar || emptyAvatar}
          alt="Фото пользователя"
          className={styles.avatar}
        />
        <img alt="Upload" src={upload} className={styles.editIcon} />
      </label>
      <FormHelperText
        error
        className={`${styles.errorInput} ${
          isFileError && styles.errorInput_active
        }`}
        sx={{ marginBottom: '10px', textAlign: 'center' }}
      >
        Загрузите фото
      </FormHelperText>
    </>
  );
};

export default React.memo(InputAvatar);
