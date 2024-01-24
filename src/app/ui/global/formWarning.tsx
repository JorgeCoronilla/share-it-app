import React from 'react';

interface Props {
  showError: boolean;
  message: string;
}

export default function FormWarning({ showError, message }: Props) {
  return showError ? (
    <div className="form-Warning">
      <p>{message}</p>
    </div>
  ) : null;
}
