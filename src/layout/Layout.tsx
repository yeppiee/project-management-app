import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BurgerMenu from '../components/BurgerMenu';
import CreateBoard from '../components/BoardForms/CreateBoard';
import Modal from '../components/Modal';
import { useAppDispatch, useAppSelector } from '../customHooks/redux';
import Footer from './Footer';
import Header from './Header';
import { boardFormSlice } from '../store/reducers/BoardFormSlice';
import { userSlice } from '../store/reducers/UserSlice';

function Layout() {
  const { createBoardModalIsOpen } = useAppSelector((state) => state.boardFormSlice);
  const { changeCreateBoardModalIsOpen } = boardFormSlice.actions;
  const { changeUserLoginStatus } = userSlice.actions;
  const dispatch = useAppDispatch();
  const [isActive, setIsActive] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/welcome') dispatch(changeUserLoginStatus(false));
  }, [changeUserLoginStatus, dispatch, pathname]);

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
          <CreateBoard closeModal={closeModal} />
        </Modal>
      )}
    </div>
  );
}

export default Layout;
