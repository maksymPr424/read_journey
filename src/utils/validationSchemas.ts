import * as Yup from 'yup';

export const registerValidationSchema = Yup.object({
  name: Yup.string()
    .max(50, 'Name must be at less 50 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'Invalid email address')
    .max(100, 'Email must be at less 50 characters')
    .required('Email is required'),
  password: Yup.string()
    .min(7, 'Password must be at least 7 characters')
    .max(50, 'Name must be at less 50 characters')
    .required('Password is required'),
});

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'Invalid email address')
    .max(100, 'Email must be at less 50 characters')
    .required('Email is required'),
  password: Yup.string()
    .min(7, 'Password must be at least 7 characters')
    .max(50, 'Name must be at less 50 characters')
    .required('Password is required'),
});

export const addToLibraryValidationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  author: Yup.string().required('Author is required'),
  totalPages: Yup.number()
    .positive('Total pages must be a positive number')
    .integer('Total pages must be an integer')
    .min(50, 'Total pages must be at least 50')
    .required('Total pages is required'),
});
