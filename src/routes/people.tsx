import People from '../components/people/People';
import { Navigate } from 'react-router-dom';
import { selectUser } from '../redux/features/userSlice';
import { useSelector } from 'react-redux';

function PeoplePage() {
  const { user } = useSelector(selectUser);

  if (!user) {
    return <Navigate replace={true} to="/" />;
  }
  return <People />;
}

export default PeoplePage;
