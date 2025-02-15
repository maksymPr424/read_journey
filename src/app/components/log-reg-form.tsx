'use client';

import { ErrorMessage, Form, Formik, FormikHelpers } from 'formik';
import InputField from './input-field';
import LogRegBtn from './log_reg_btn';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import {
  loginValidationSchema,
  registerValidationSchema,
} from '@/utils/validationSchemas';
import { queryClient } from '../providers';
import { loginUser, registerUser } from '@/lib/auth';

export interface LogRegFormProps {
  typeForm: string;
}

export interface LogRegValuesProps {
  name?: string;
  email: string;
  password: string;
}

const RegInitialValues = {
  name: '',
  email: '',
  password: '',
};

const LogInitialValues = {
  email: '',
  password: '',
};

export default function LogRegForm({ typeForm }: LogRegFormProps) {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: typeForm === 'reg' ? registerUser : loginUser,
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data);
      // console.log(queryClient.getQueryData(['user']));

      router.push('/recommended');
    },
    onError: () => {
      alert('Error!');
    },
  });

  const handleSubmitForm = (
    values: LogRegValuesProps,
    actions: FormikHelpers<LogRegValuesProps>,
  ) => {
    mutation.mutate(values);
    actions.resetForm();
  };

  const handleChangeForm = () => {
    router.push(typeForm === 'reg' ? '/login' : '/register');
  };

  return (
    <Formik
      initialValues={typeForm === 'reg' ? RegInitialValues : LogInitialValues}
      onSubmit={handleSubmitForm}
      validationSchema={
        typeForm === 'reg' ? registerValidationSchema : loginValidationSchema
      }
    >
      <Form className="flex flex-col justify-between flex-1">
        <div className="flex flex-col gap-4">
          {typeForm === 'reg' && (
            <div className="relative">
              <InputField label="Name" id="name" validate={true} name="name" />
              <ErrorMessage
                name="name"
                component="p"
                className="text-red-500 text-xs absolute bottom-[-16px] left-3.5"
              />
            </div>
          )}
          <div className="relative">
            <InputField label="Email" id="email" validate={true} name="email" />
            <ErrorMessage
              name="email"
              component="p"
              className="text-red-500 text-xs absolute bottom-[-16px] left-3.5"
            />
          </div>
          <div className="relative">
            <InputField
              label="Password"
              id="password"
              validate={true}
              name="password"
            />
            <ErrorMessage
              name="password"
              component="p"
              className="text-red-500 text-xs absolute bottom-[-16px] left-3.5"
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <LogRegBtn type="submit">
            {typeForm === 'reg' ? 'Registration' : 'Log in'}
          </LogRegBtn>
          <button
            type="button"
            onClick={handleChangeForm}
            className="text-xs text-lightGray underline hover:text-foreground active:text-foreground focus:text-foreground"
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
