import React from 'react';
import { useNavigation } from '@react-navigation/native';
import LoginForm from './login.form';

export default function Login({screenName}:{screenName: any}) {
  const navigation = useNavigation();
  const handleLogin = () => {
    return navigation.navigate(screenName);
  }
  return (
    <LoginForm handleLogin={handleLogin}/>
  );
}