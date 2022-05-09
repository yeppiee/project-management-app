import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import BurgerMenu from '../components/BurgerMenu';
import Footer from './Footer';
import Header from './Header';

function Layout() {
  const [isActive, setIsActive] = useState(false);

  const handleChange = () => setIsActive(!isActive);
  const setInactive = () => setIsActive(false);

  return (
    <div className="h-screen flex flex-col">
      <Header handleChange={handleChange} />
      <main className="flex-auto">
        <Outlet />
      </main>
      <Footer />
      <BurgerMenu isActive={isActive} setInactive={setInactive} />
    </div>
  );
}

export default Layout;
