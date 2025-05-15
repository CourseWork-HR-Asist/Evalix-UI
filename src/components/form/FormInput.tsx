import React from 'react';
import { UseFormRegister, FieldErrors, FieldError } from 'react-hook-form';

interface FormInputProps {
  name: string
  type: string
  placeholder: string
  options: Record<string, unknown>
  register: UseFormRegister<any>
  errors: FieldErrors<any>
}

const FormInput: React.FC<FormInputProps> = ({ name, type, placeholder, options, register, errors }) => {
  return (
    <div>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-[#01B399] focus:outline-none
                     text-black placeholder-gray-500
                     dark:border-[#3A3A3A] dark:focus:border-[#01B399] dark:bg-[#2A2A2A] dark:text-gray-200 dark:placeholder-gray-500"
          {...register(name, options)}
        />
      </div>
      {errors[name] && <p className="text-red-500 text-xs mt-1">{(errors[name] as FieldError).message}</p>}
    </div>
  );
};

export default FormInput