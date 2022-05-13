import React from 'react';
import LoginForm from './login.form';
import { useAppDispatch } from '../../redux/store'
import { login } from '../../redux/auth-slice';
import { User } from '../../interfaces/common';

export default function Login() {
  const dispatch = useAppDispatch();
  const handleLogin = (username: string, password: string) => {
    const userData: User = {
      username,
      password,
    };
    console.log("login container", userData);
    dispatch(login(userData));
  }
  return (
    <LoginForm handleLogin={(username: string, password: string) => handleLogin(username, password)}/>
  );
}