import { useEffect, lazy, Suspense } from 'react';

import { Loading } from './components';
import { useAppDispatch } from './redux/hooks';
import { toggleSidenav } from './redux/settings/settingsSlice';

const Routes = lazy(() => import('./Routes'));

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getSettings = () => {
      if (window.innerWidth <= 768) {
        dispatch(toggleSidenav());
      }
    };

    getSettings();
  }, []);

  return (
    <Suspense fallback={<Loading message="Sedang mengambil pengaturan web..." />}>
      <Routes />
    </Suspense>
  );
}

export default App;
