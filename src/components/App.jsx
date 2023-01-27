import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from 'redux/auth/authOperation';
import { getTransactionCategories } from 'redux/finance/transactionOperation';
import BtnModalOpen from './BtnModalOpen';
import ModalAddTransaction from './ModalAddTransaction';
import RegForm from './RegForm';

export const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const name = useSelector(state => state.auth.user.username);
  const isModalOpen = useSelector(
    state => state.global.isModalAddTransactionOpen
  );
  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(getTransactionCategories());
  }, [dispatch]);

  return (
    <>
      {/* {isLoggedIn ? <h1>hi {name}</h1> : <RegForm />} */}
      <RegForm />
      <BtnModalOpen />
      {isModalOpen && <ModalAddTransaction />}
    </>
  );
};
