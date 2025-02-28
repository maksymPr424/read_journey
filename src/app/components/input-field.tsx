'use client';

import { Field, useField } from 'formik';
import { useState } from 'react';
import clsx from 'clsx';
import CustomIcon from './custom-icon';

export interface InputFieldProps
  extends Partial<React.InputHTMLAttributes<HTMLInputElement>> {
  label: string;
  validate?: boolean;
  type?: string;
}

export default function InputField({
  label,
  id,
  validate = false,
  type,
  ...rest
}: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputType, setInputType] = useState('password');
  const [field, meta] = useField({ id, ...rest });
  const labelTech = label.toLowerCase();

  const getInputType = () => {
    if (type !== undefined) return type;

    return labelTech === 'password'
      ? inputType
      : labelTech === 'email'
        ? 'email'
        : 'text';
  };

  const changeInputType = () => {
    setInputType((prev) => (prev === 'password' ? 'text' : 'password'));
  };

  return (
    <div
      className={clsx(
        'flex items-start flex-1 rounded-xl bg-gray transition-all relative',
        validate
          ? meta.touched && meta.error
            ? 'border border-red-500'
            : meta.touched
              ? 'border border-green'
              : isFocused
                ? 'border border-lightGray'
                : 'border border-transparent'
          : isFocused
            ? 'border border-lightGray'
            : 'border border-transparent',
      )}
    >
      {label && (
        <label
          htmlFor={id}
          className="whitespace-nowrap text-xs text-lightGray p-3.5 pr-0"
        >
          {label}:
        </label>
      )}
      <Field
        {...field}
        {...rest}
        id={id}
        className="p-3.5 pr-9 text-xs rounded-xl bg-gray flex-1 focus:outline-none max-[375px]:w-[100px] min-[375px]:w-full"
        autoComplete="off"
        type={getInputType()}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {validate ? (
        meta.touched && meta.error && labelTech !== 'password' ? (
          <div className="absolute top-1/2 translate-y-[-50%] right-3">
            <CustomIcon
              id="icon-error"
              className="w-[18px] h-[18px] fill-foreground"
            />
          </div>
        ) : labelTech !== 'password' && meta.touched && !meta.error ? (
          <div className="absolute top-1/2 translate-y-[-50%] right-3">
            <CustomIcon
              id="icon-success"
              className="w-[18px] h-[18px] fill-foreground"
            />
          </div>
        ) : (
          labelTech === 'password' && (
            <button
              onClick={changeInputType}
              className="absolute top-1/2 translate-y-[-50%] right-3"
              type="button"
            >
              <CustomIcon
                id={inputType === 'password' ? 'icon-eye' : 'icon-eye-off'}
                className="w-[18px] h-[18px] fill-foreground"
              />
            </button>
          )
        )
      ) : null}
    </div>
  );
}
