'use client';

import { Form, Formik } from 'formik';
import { useState } from 'react';
import InputField from './input-field';
import LogRegBtn from './log_reg_btn';

const RegInitialValues = {
  name: '',
  email: '',
  password: '',
};

const LogInitialValues = {
  email: '',
  password: '',
};

export default function LogRegForm() {
  const [typeForm, setTypeForm] = useState('reg');

  //TODO: Auth functional
  const handleSubmitForm = (values, action) => {};

  const handleChangeFormType = () => {
    setTypeForm((prev) => (prev === 'reg' ? 'log' : 'reg'));
  };

  return (
    <Formik
      initialValues={typeForm === 'reg' ? RegInitialValues : LogInitialValues}
      onSubmit={handleSubmitForm}
    >
      <Form className="flex flex-col justify-between flex-1">
        <div className="flex flex-col gap-2">
          {typeForm === 'reg' && (
            <InputField label="Name" id="name" name="name" />
          )}
          <InputField label="Email" id="email" name="email" />
          <InputField label="Password" id="password" name="password" />
        </div>
        <div className="flex justify-between items-center">
          <LogRegBtn>
            {typeForm === 'reg' ? 'Registration' : 'Log in'}
          </LogRegBtn>
          <button
            onClick={handleChangeFormType}
            className="text-xs text-lightGray underline"
          >
            {typeForm === 'reg'
              ? 'Already have an account?'
              : 'Don’t have an account?'}
          </button>
        </div>
      </Form>
    </Formik>
  );
}
