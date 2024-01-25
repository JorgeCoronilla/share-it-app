import React from 'react';

interface Props {
  showError: boolean;
  message: string;
}

export default function FormError({ showError, message }: Props) {
  return showError ? (
    <div className="form-error">
      <p>{message}</p>
    </div>
  ) : null;
}
