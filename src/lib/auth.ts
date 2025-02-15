import { LogRegValuesProps } from '@/app/components/log-reg-form';
import { setBearerToken } from './api';
import { redirect } from 'next/navigation';
import axios from 'axios';

export async function logOut() {
  try {
    await axios.post('/users/signout');
  } finally {
    console.log('Logging out...');

    setBearerToken('');
    redirect('/login');
  }
}

export async function registerUser(data: LogRegValuesProps) {
  const user = await axios.post('users/signup', data);
  setBearerToken(user.data.token);
  return user.data;
}

export async function loginUser(data: LogRegValuesProps) {
  const user = await axios.post('users/signin', data);
  setBearerToken(user.data.token);

  return user.data;
}
