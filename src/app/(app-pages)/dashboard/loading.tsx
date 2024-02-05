import Header from '@/app/ui/components/dashboard/header/header';
import Menu from '@/app/ui/components/dashboard/menu/menu';
import React from 'react';
import ContentLoader from 'react-content-loader';

export default function Loading() {
  return (
    <>
      <div style={{ position: 'absolute', top: '0', left: '0' }}>
        <ContentLoader
          speed={2}
          width={280}
          height={400}
          viewBox="0 0 280 400"
          backgroundColor="var(--background-color-transparent)"
          foregroundColor="var(--stain-2-color)"
        >
          <rect
            x="40"
            y="115"
            rx="6"
            ry="6"
            width="140"
            height="30"
          />

          <rect
            x="40"
            y="170"
            rx="4"
            ry="4"
            width="200"
            height="15"
          />

          <rect
            x="40"
            y="230"
            rx="4"
            ry="4"
            width="240"
            height="3"
          />
          <rect
            x="40"
            y="315"
            rx="4"
            ry="4"
            width="240"
            height="3"
          />

          <rect
            x="40"
            y="230"
            rx="4"
            ry="4"
            width="3"
            height="87"
          />
          <rect
            x="277"
            y="230"
            rx="4"
            ry="4"
            width="3"
            height="87"
          />
          <rect
            x="55"
            y="245"
            rx="4"
            ry="4"
            width="130"
            height="15"
          />
          <rect
            x="55"
            y="270"
            rx="4"
            ry="4"
            width="100"
            height="12"
          />
          <rect
            x="55"
            y="292"
            rx="4"
            ry="4"
            width="110"
            height="12"
          />

          <rect
            x="230"
            y="260"
            rx="4"
            ry="4"
            width="40"
            height="46"
          />
        </ContentLoader>
      </div>
    </>
  );
}
