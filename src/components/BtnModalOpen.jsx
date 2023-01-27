import { useEffect } from 'react';
import { toggleModalAddTransactionOpen } from 'redux/global/globalSlice';

const { useSelector, useDispatch } = require('react-redux');

const BtnModalOpen = () => {
  const isModalOpen = useSelector(
    state => state.global.isModalAddTransactionOpen
  );
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(toggleModalAddTransactionOpen());
    console.log(isModalOpen);
  };

  return (
    <button type="button" onClick={handleClose}>
      Open
    </button>
  );
};
export default BtnModalOpen;
