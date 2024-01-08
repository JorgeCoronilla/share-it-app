import React from 'react';

interface Props {
  showError: boolean;
  message: string;
}

export default function FormWarning({ showError, message }: Props) {
  return showError ? <p style={{ color: 'red' }}>{message}</p> : null;
}
