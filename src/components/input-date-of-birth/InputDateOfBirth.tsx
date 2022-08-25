import styles from './InputDateOfBirth.module.css';
import React from 'react';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ruLocale from 'date-fns/locale/ru';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
  setDateOfBirth,
  setIsDateOfBirthError,
  selectIndex,
} from '../../redux/features/indexSlice';
import { useAppDispatch } from '../../redux/hooks';
import { useSelector } from 'react-redux';

const InputDateOfBirth = () => {
  const { dateOfBirth, isDateOfBirthError, isShowErrors, status } =
    useSelector(selectIndex);
  const dispatch = useAppDispatch();

  function handleDateOfBirthChange(value: number | null | Date) {
    if (value) {
      const timestamp = new Date(value).getTime();
      if (timestamp !== null && timestamp > -1577934000000) {
        dispatch(setDateOfBirth(timestamp));
        dispatch(setIsDateOfBirthError(false));
      } else {
        if (isShowErrors) {
          dispatch(setIsDateOfBirthError(true));
        }
      }
    } else {
      dispatch(setDateOfBirth(null));
      if (isShowErrors) {
        dispatch(setIsDateOfBirthError(true));
      }
    }
  }

  return (
    <FormControl fullWidth>
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={ruLocale}
      >
        <DatePicker
          disabled={status === 'loading'}
          label="Дата рождения *"
          value={dateOfBirth}
          onChange={handleDateOfBirthChange}
          minDate={new Date('01-01-1920')}
          renderInput={(params) => {
            const newParams = {
              ...params,
              inputProps: {
                ...params.inputProps,
                placeholder: 'дд.мм.гггг',
              },
              error: isDateOfBirthError ? true : false,
            };
            return (
              <TextField variant="outlined" {...newParams} autoComplete="off" />
            );
          }}
        />
      </LocalizationProvider>
      <FormHelperText
        error
        className={`${styles.errorInput} ${
          isDateOfBirthError && styles.errorInput_active
        }`}
        sx={{ marginBottom: '10px' }}
      >
        Заполните поле (дд.мм.гггг)
      </FormHelperText>
    </FormControl>
  );
};

export default React.memo(InputDateOfBirth);
