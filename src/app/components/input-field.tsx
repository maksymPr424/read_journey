'use client';

import { Field } from 'formik';
import { useState } from 'react';
import Icon from './icon';

export interface InputFieldProps
  extends Partial<React.InputHTMLAttributes<HTMLInputElement>> {
  label: string;
}

export default function InputField({ label, id, ...rest }: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputType, setInputType] = useState('password');
  const labelTech = label.toLowerCase();

  const getInputType = () => {
    return labelTech === 'password'
      ? inputType
      : labelTech === 'email'
        ? 'email'
        : 'text';
  };

  const getIconId = () => {
    return inputType === 'password' ? 'icon-eye' : 'icon-eye-off';
  };

  const changeInputType = () => {
    setInputType((prev) => (prev === 'password' ? 'text' : 'password'));
  };

  return (
    <div
      className={`flex items-start flex-1 rounded-xl bg-gray transition-all relative ${
        isFocused ? 'border border-lightGray' : 'border border-transparent'
      }`}
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
        {...rest}
        id={id}
        className="p-3.5 pr-9 text-xs rounded-xl bg-gray flex-1 focus:outline-none max-[375px]:w-[150px] min-[375px]:w-full"
        autoComplete="off"
        type={getInputType()}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {labelTech !== 'password' ? null : (
        <button
          onClick={changeInputType}
          className="absolute top-1/2 translate-y-[-50%] right-3"
        >
          <Icon
            id={getIconId()}
            className="w-[18px] h-[18px] fill-foreground"
          />
        </button>
      )}
    </div>
  );
}
