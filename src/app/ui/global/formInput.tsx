'use client';
import React from 'react';

interface Props {
  getData?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  type: string;
  name: string;
  autoComplete?: string;
  placeholder: string;
  list?: string;
}
export default function FormInput({
  getData,
  label,
  type,
  name,
  autoComplete,
  placeholder,
  list,
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
      />
    </>
  );
}
