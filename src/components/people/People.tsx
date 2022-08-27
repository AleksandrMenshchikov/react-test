import styles from './People.module.css';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import { setUser } from '../../redux/features/userSlice';
import { useAppDispatch } from '../../redux/hooks';
import { Link } from 'react-router-dom';

function People() {
  const dispatch = useAppDispatch();

  function handleLogoutClick() {
    dispatch(setUser(null));
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
      </div>
    </div>
  );
}

export default People;
