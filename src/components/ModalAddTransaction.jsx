import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction } from 'redux/finance/transactionOperation';

const ModalAddTransaction = () => {
  const dispatch = useDispatch();
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [comment, setComment] = useState('');
  const [amount, setAmount] = useState(null);
  const categories = useSelector(state => state.finance.categories);
  const expenseCategories = categories.filter(
    category => category.type !== 'INCOME'
  );

  const saveDataTransaction = e => {
    switch (e.currentTarget.name) {
      case 'date':
        setDate(e.currentTarget.value);
        break;
      case 'type':
        setType(e.currentTarget.value);
        break;
      case 'category':
        setCategory(e.currentTarget.value);
        break;
      case 'comment':
        setComment(e.currentTarget.value);
        break;
      case 'amount':
        setAmount(Number(e.currentTarget.value));
        break;
      default:
        return;
    }
  };

  const handleSubmitAddTransaction = e => {
    e.preventDefault();

    const dataTransaction = {
      transactionDate: date,
      type: type,
      categoryId: category,
      comment: comment,
      amount: amount,
    };
    if (type === 'EXPENSE') {
      dataTransaction.amount = -amount;
    }
    if (type === 'INCOME') {
      dataTransaction.categoryId = categories.find(
        category => category.type === 'INCOME'
      ).id;
    }
    console.log(dataTransaction);
    dispatch(addTransaction(dataTransaction));
    setDate('');

    setType('');

    setCategory('');

    setComment('');

    setAmount(null);
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmitAddTransaction}>
      <h2>Add transaction</h2>
      <label>
        <input
          type="radio"
          name="type"
          value="INCOME"
          required
          onChange={saveDataTransaction}
        />
        Income
      </label>
      <label>
        <input
          type="radio"
          name="type"
          value="EXPENSE"
          onChange={saveDataTransaction}
        />
        Expense
      </label>
      <select name="category" onChange={saveDataTransaction} required>
        {expenseCategories.length !== 0 &&
          expenseCategories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}{' '}
            </option>
          ))}
      </select>
      <label>
        <input
          type="number"
          name="amount"
          value={amount}
          onChange={saveDataTransaction}
          required
        />
      </label>
      <label>
        <input
          type="date"
          name="date"
          onChange={saveDataTransaction}
          value={date}
          required
        />
      </label>
      <label>
        <input
          type="text"
          name="comment"
          value={comment}
          onChange={saveDataTransaction}
        />
      </label>
      <button type="submit"> Add transaction</button>
    </form>
  );
};
export default ModalAddTransaction;
