import React from 'react';
import CardDescription from './cardDescription';
interface Props {
  friend?: Friend;
}
export default function CardList({ friend }: Props) {
  if (!friend) return null;

  return (
    <ul key={`ul-${friend.id}`}>
      {friend.groups_ids.map((group, index) => {
        return (
          <li
            key={group}
            className="card-list normal-text"
          >
            {friend.groups_names[index]}
          </li>
        );
      })}
    </ul>
  );
}
