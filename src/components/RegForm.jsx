import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from 'redux/auth/authOperation';

const RegForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        return setUsername(value);
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      default:
        return;
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(register({ username, email, password }));
    setEmail('');
    setUsername('');
    setPassword('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input
          type="text"
          name="name"
          value={username}
          required
          onChange={handleChange}
        />
      </label>
      <label>
        <input
          type="email"
          name="email"
          value={email}
          required
          onChange={handleChange}
        />
      </label>
      <label>
        <input
          type="password"
          name="password"
          value={password}
          required
          onChange={handleChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
export default RegForm;
