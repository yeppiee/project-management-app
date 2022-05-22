import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import BurgerMenu from '../components/BurgerMenu';
import CreateBoard from '../components/CreateBoard';
import Modal from '../components/Modal';
import { useAppDispatch, useAppSelector } from '../customHooks/redux';
import { userSlice } from '../store/reducers/UserSlice';
import Footer from './Footer';
import Header from './Header';

function Layout() {
  const { createBoardModalIsOpen } = useAppSelector((state) => state.userSlice);
  const { changeCreateBoardModalIsOpen } = userSlice.actions;
  const dispatch = useAppDispatch();
  const [isActive, setIsActive] = useState(false);

  const handleChange = () => setIsActive(!isActive);
  const setInactive = () => setIsActive(false);
  const closeModal = () => dispatch(changeCreateBoardModalIsOpen(false));

  return (
    <div className="h-screen flex flex-col">
      <Header handleChange={handleChange} />
      <main className="flex-auto">
        <Outlet />
      </main>
      <Footer />
      <BurgerMenu isActive={isActive} setInactive={setInactive} />
      {createBoardModalIsOpen && (
        <Modal closeModal={closeModal}>
          <CreateBoard />
        </Modal>
      )}
    </div>
  );
}

export default Layout;
