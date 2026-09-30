'use client';

import dynamic from 'next/dynamic';

const ProteinLoader = dynamic(() => import('./components/ProteinLoader/ProteinLoader'), { ssr: false });

/** Route-level loading UI: shown while a page segment is streaming in. */
export default function Loading() {
  return (
    <div
      aria-busy="true"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0E2016',
      }}
    >
      <ProteinLoader theme="forest" size={380} />
    </div>
  );
}
