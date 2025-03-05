// WF2afa13
// wafage22FQ

import { LogRegValuesProps } from '@/app/components/log-reg-form';
import { setBearerToken } from './api';
import { redirect } from 'next/navigation';
import axios from 'axios';
import { queryClient } from '@/app/providers';
// import { queryClient } from '@/app/providers';

export async function logOut() {
  try {
    await axios.post('/users/signout');
  } finally {
    queryClient.clear();
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

export async function refreshUser() {
  try {
    const tokens = await axios('users/current/refresh');
    setBearerToken(tokens.data.token);
    return tokens.data;
  } catch (error) {
    console.log(error);
  }
}
