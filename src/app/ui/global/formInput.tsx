'use client';

import React from 'react';

interface Props {
  getData?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  label: string;
  type: string;
  name: string;
  autoComplete?: string;
  placeholder: string;
  list?: string;
  value?: string;
  readOnly?: boolean;
}
export default function FormInput({
  getData,
  onClick,
  label,
  type,
  name,
  autoComplete,
  placeholder,
  list,
  value,
  readOnly,
}: Props) {
  return (
    <>
      <label htmlFor={`id-n-${name}`}>{label}</label>
      <input
        type={type}
        name={name}
        onChange={getData}
        autoComplete={autoComplete}
        placeholder={placeholder}
        id={`id-n-${name}`}
        list={list}
        value={value}
        readOnly={readOnly}
        onClick={onClick}
        maxLength={15}
      />
    </>
  );
}
