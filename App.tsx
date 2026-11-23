import { useEffect } from 'react';
import { useRoute, href } from './lib/router';
import { restoreSession } from './lib/session';
import { Icon } from './components/Icon';
import { Home } from './pages/Home';
import { Learn } from './pages/Learn';
import { Study } from './pages/Study';
import { Practice } from './pages/Practice';
import { SessionPage } from './pages/SessionPage';
import { Result } from './pages/Result';
import { Evaluate } from './pages/Evaluate';
import { Achievements } from './pages/Achievements';
import { Profile } from './pages/Profile';

const NAV = [
  { key: '', label: 'Beranda', icon: 'home' },
  { key: 'belajar', label: 'Belajar', icon: 'book' },
  { key: 'latihan', label: 'Latihan', icon: 'pencil' },
  { key: 'evaluasi', label: 'Evaluasi', icon: 'clipboard' },
  { key: 'prestasi', label: 'Prestasi', icon: 'trophy' },
  { key: 'profil', label: 'Profil', icon: 'user' },
];

restoreSession();

export function App() {
  const route = useRoute();
  const [root, a] = route.path;
  const activeKey = ['sesi', 'hasil'].includes(root) ? 'latihan' : root === 'materi' ? 'belajar' : (root || '');

  useEffect(() => { document.title = 'Teman Pintar'; }, []);

  let page;
  switch (root) {
    case undefined: page = <Home />; break;
    case 'belajar': page = <Learn subject={a} />; break;
    case 'materi': page = <Study id={a} />; break;
    case 'latihan': page = <Practice query={route.query} />; break;
    case 'sesi': page = <SessionPage />; break;
    case 'hasil': page = <Result />; break;
    case 'evaluasi': page = <Evaluate />; break;
    case 'prestasi': page = <Achievements />; break;
    case 'profil': page = <Profile />; break;
    default: page = <Home />;
  }

  return (
    <div className="shell">
      <aside className="side" aria-label="Menu utama">
        <a className="brand" href={href('')}><span className="logo"><Icon name="bulb" size={22} /></span> Teman Pintar</a>
        <nav>{NAV.map(n => <a key={n.key} href={href(n.key)} className={activeKey === n.key ? 'on' : ''} aria-current={activeKey === n.key ? 'page' : undefined}><Icon name={n.icon} size={22} />{n.label}</a>)}</nav>
      </aside>
      <main className="main" id="main">{page}</main>
      <nav className="bottom" aria-label="Menu utama">{NAV.map(n => <a key={n.key} href={href(n.key)} className={activeKey === n.key ? 'on' : ''}><Icon name={n.icon} size={22} /><span>{n.label}</span></a>)}</nav>
    </div>
  );
}
