import React from 'react';

interface Props {
  list?: GroupData[];
}
export default function InputList({ list }: Props) {
  return (
    <>
      {list && (
        <datalist id="groups">
          {list.map((item, index) => (
            <option
              key={index}
              value={item.name}
            />
          ))}
        </datalist>
      )}
    </>
  );
}
