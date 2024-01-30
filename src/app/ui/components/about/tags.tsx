import React from 'react';
import { tagsList } from './tagList';

export default function Tags() {
  return (
    <div className="tags-container">
      {tagsList.map((tag) => (
        <div key={tag.id}>
          <p
            id={tag.id}
            style={{ backgroundColor: tag.backGroundColor, color: tag.color }}
          >
            {tag.name}
          </p>
        </div>
      ))}
    </div>
  );
}
