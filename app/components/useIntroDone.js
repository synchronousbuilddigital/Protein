'use client';

import { useSyncExternalStore } from 'react';

/*
 * true once the SiteLoader intro has lifted (or when there is no intro). Heavy work — extra WebGL
 * scenes especially — should wait for this so it doesn't steal frames from the loader animation.
 */
const subscribe = (cb) => {
  window.addEventListener('proteinest:intro-done', cb);
  return () => window.removeEventListener('proteinest:intro-done', cb);
};
const getSnapshot = () => window.__proteinestIntroDone === true || !document.getElementById('proteinest-intro');
const getServerSnapshot = () => false;

export default function useIntroDone() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
