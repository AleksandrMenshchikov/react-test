import React, { useEffect } from 'react';
import Account from '../components/account/Account';
import { Navigate } from 'react-router-dom';
import { selectUser } from '../redux/features/userSlice';
import { useSelector } from 'react-redux';

function AccountPage() {
  const { user } = useSelector(selectUser);

  if (!user) {
    return <Navigate replace={true} to="/" />;
  }
  return <Account />;
}

export default AccountPage;
