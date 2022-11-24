import React from 'react';
import LoginForm from './login.form';
import { useAppDispatch } from '../../redux/store'
import { loginUser } from '../../redux/auth-slice';
import { User } from '../../interfaces/common';
import { useSelector } from 'react-redux';

export default function Login() {
  const dispatch = useAppDispatch();
  const authentication = useSelector((state: any) => state.authentication);
  const handleLogin = (username: string, password: string) => {
    const user: User = {
      username,
      password,
    };
    dispatch(loginUser({ user }));
  }
  return (
    <LoginForm
      handleLogin={(username: string, password: string) => handleLogin(username, password)}
      loadingUser={authentication.loading} loginFailed={authentication.error} />
  );
}