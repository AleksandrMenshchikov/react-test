import styles from './InputNameAccount.module.css';
import React, { useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import { useSelector } from 'react-redux';
import {
  selectAccount,
  setName,
  setIsNameErrorAccount,
} from '../../redux/features/accountSlice';
import { selectUser } from '../../redux/features/userSlice';
import { useAppDispatch } from '../../redux/hooks';

const InputName = () => {
  const { name, isNameError, isShowErrors, statusAccount, isFormEdit } =
    useSelector(selectAccount);
  const { user } = useSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setName(user.name));
  }, []);

  function handleNameChange(evt: {
    currentTarget: { value: string; checkValidity: () => boolean };
  }) {
    dispatch(setName(evt.currentTarget.value.trimStart()));
    if (isShowErrors) {
      evt.currentTarget.value.length < 2
        ? dispatch(setIsNameErrorAccount(true))
        : dispatch(setIsNameErrorAccount(false));
    }
  }

  return (
    <FormControl fullWidth>
      <TextField
        disabled={statusAccount === 'loading' || !isFormEdit}
        variant="outlined"
        error={isNameError}
        type="text"
        id="name"
        value={name}
        onChange={handleNameChange}
        label="Имя"
        autoFocus
        inputProps={{ minLength: 2, maxLength: 100 }}
        autoComplete="name"
        placeholder="Имя"
      />
      <FormHelperText
        error
        className={`${styles.errorInput} ${
          isNameError && styles.errorInput_active
        }`}
        sx={{ marginBottom: '10px' }}
      >
        Заполните поле
      </FormHelperText>
    </FormControl>
  );
};

export default React.memo(InputName);
