import React from 'react';
import LoginForm from './login.form';

export default function Login() {
  const handleLogin = () => {
    console.log('inProgress');
  }
  return (
    <LoginForm handleLogin={handleLogin}/>
  );
}