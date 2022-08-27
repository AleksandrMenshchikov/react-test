import styles from './People.module.css';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { setUser } from '../../redux/features/userSlice';
import { useAppDispatch } from '../../redux/hooks';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { resetDataPeople, runGetUsers } from '../../redux/features/peopleSlice';
import { selectPeople } from '../../redux/features/peopleSlice';
import { useSelector } from 'react-redux';

function People() {
  const dispatch = useAppDispatch();
  const { status, data } = useSelector(selectPeople);

  useEffect(() => {
    if (!data) {
      dispatch(runGetUsers());
    }
  }, []);

  function handleLogoutClick() {
    dispatch(setUser(null));
    dispatch(resetDataPeople());
  }

  return (
    <div className={styles.container}>
      <div className={styles.innerWrapper}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>Друзья</h2>
          <Link to="/account" style={{ textDecoration: 'none' }}>
            <Button
              sx={{ textTransform: 'none', fontSize: '1.8rem' }}
              variant="outlined"
            >
              Аккаунт
            </Button>
          </Link>
          <IconButton onClick={handleLogoutClick}>
            <LogoutIcon sx={{ fontSize: '24px' }} />
          </IconButton>
        </div>
        <ul className={styles.list}>
          {data &&
            status === 'idle' &&
            data.data.map((item: any) => {
              return (
                <li key={item._id} className={styles.listItem}>
                  <img alt="Фото" src={item.avatar} className={styles.img} />
                  <h4 className={styles.text}>{item.name}</h4>
                  <p className={styles.text}>
                    Возраст:{' '}
                    {Math.floor(
                      (new Date().getTime() - item.dateOfBirth) / 31556952000
                    )}
                  </p>
                </li>
              );
            })}
        </ul>
      </div>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={status === 'loading' ? true : false}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default People;
