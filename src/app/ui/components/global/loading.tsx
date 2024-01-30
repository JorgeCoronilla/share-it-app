import React from 'react';

interface Props {
  showError: boolean;
  message: string;
}

export default function Loading({ showError, message }: Props) {
  return showError ? (
    // <div className="loading">
    //   <p>{message}</p>
    // </div>
    <div className="loader">
      <div className="inner one"></div>
      <div className="inner two"></div>
      <div className="inner three"></div>
      <p>...loading</p>
    </div>
  ) : null;
}
