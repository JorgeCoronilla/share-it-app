import React from 'react';

interface Props {
  message: string;
}

export default function NoData({ message }: Props) {
  return <p className="mt-4 text-gray-400">{message}</p>;
}
