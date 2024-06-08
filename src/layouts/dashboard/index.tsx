import './style.css';

import { Outlet } from 'react-router-dom';

import Header from './header';
import Footer from './footer';
import Sidenav from './sidenav';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { toggleSidenav } from '../../redux/settings/settingsSlice';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const expanded = useAppSelector((state) => state.settings.isSidenavOpen);

  const handleToggelSidenav = () => {
    dispatch(toggleSidenav());
  };

  return (
    <>
      <Sidenav expanded={expanded} setExpanded={handleToggelSidenav} />
      <section
        className={`min-h-screen relative transition-all duration-500 ${
          expanded ? 'laptop:ml-[300px]' : 'laptop:ml-[80px]'
        }`}
      >
        <Header setExpanded={handleToggelSidenav} />
        <main>
          <Outlet />
        </main>
        <Footer />
      </section>
    </>
  );
};

export default Dashboard;
