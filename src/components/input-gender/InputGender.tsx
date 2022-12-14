import styles from './InputGender.module.css';
import React from 'react';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useSelector } from 'react-redux';
import { selectSignup, postGender } from '../../redux/features/signupSlice';
import { useAppDispatch } from '../../redux/hooks';

const InputGender = () => {
  const { gender, isGenderError, status } = useSelector(selectSignup);
  const dispatch = useAppDispatch();

  function handleGenderChange(evt: { target: { value: string } }) {
    dispatch(postGender(evt.target.value));
  }

  return (
    <FormControl fullWidth>
      <InputLabel error={isGenderError} id="gender">
        Пол *
      </InputLabel>
      <Select
        disabled={status === 'loading'}
        required
        error={isGenderError}
        labelId="gender"
        id="gender"
        value={gender}
        label="Пол"
        onChange={handleGenderChange}
      >
        <MenuItem value={'male'}>Мужской</MenuItem>
        <MenuItem value={'female'}>Женский</MenuItem>
      </Select>
      <FormHelperText
        error
        className={`${styles.errorInput} ${
          isGenderError && styles.errorInput_active
        }`}
        sx={{ marginBottom: '10px' }}
      >
        Выберите пол
      </FormHelperText>
    </FormControl>
  );
};

export default React.memo(InputGender);
