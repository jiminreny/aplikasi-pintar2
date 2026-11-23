import { useEffect, useState } from 'react';

export interface Route { path: string[]; query: URLSearchParams; }

function parse(): Route {
  const raw = window.location.hash.replace(/^#\/?/, '');
  const [p, q = ''] = raw.split('?');
  return { path: p.split('/').filter(Boolean).map(decodeURIComponent), query: new URLSearchParams(q) };
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(parse);
  useEffect(() => {
    const on = () => { setRoute(parse()); window.scrollTo({ top: 0 }); };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return route;
}

export const href = (path: string, query?: Record<string, string | undefined>) => {
  const q = query ? Object.entries(query).filter(([, v]) => v).map(([k, v]) => `${k}=${encodeURIComponent(v!)}`).join('&') : '';
  return `#/${path}${q ? `?${q}` : ''}`;
};
export const go = (path: string, query?: Record<string, string | undefined>) => { window.location.hash = href(path, query).slice(1); };
export const back = () => { if (window.history.length > 1) window.history.back(); else go(''); };
