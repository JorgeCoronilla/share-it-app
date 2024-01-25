import React from 'react';

interface Props {
  showError: boolean;
  message: string;
  icon?: boolean;
}

export default function FormWarning({ showError, message, icon }: Props) {
  return showError ? (
    <div className={`form-Warning ${icon ? `icon-warning` : ''}`}>
      <p>{message}</p>
    </div>
  ) : null;
}
