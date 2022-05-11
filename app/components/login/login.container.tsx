import React from 'react';
import LoginForm from './login.form';
import {useAppDispatch} from '../../store/store'
import { login } from '../../store/auth-slice';

export default function Login() {
  const dispatch = useAppDispatch();
  const handleLogin = (username: string, password: string) => {
    const userData = {
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