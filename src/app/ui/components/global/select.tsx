import React from 'react';

interface Props {
  getData: (e: React.MouseEvent<HTMLSelectElement>) => void;
  name: string;
  label: string;
  groups?: GroupData[];
}

export default function Select({ getData, groups, name, label }: Props) {
  if (groups && groups.length < 1) {
  }
  return (
    <>
      <label htmlFor={`id-n-rrrr`}>{label}</label>
      <select
        onClick={getData}
        id={`id-n-}`}
        name={name}
      >
        {groups &&
          groups.map((item, index) => (
            <option
              key={item.name}
              value={item.id}
            >
              {item.name}
            </option>
          ))}
      </select>
    </>
  );
}
