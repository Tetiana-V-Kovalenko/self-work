import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from 'redux/auth/authOperation';

function validateText(value) {
  if (!value) {
    return 'Required';
  }
}

function validateEmail(value) {
  if (!value) {
    return 'Required';
  } else if (
    !/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i.test(
      value
    )
  ) {
    return 'Invalid email address';
  }
}
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
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <label>Name</label>
          <Field
            type="text"
            name="name"
            value={username}
            validate={validateText}
            onChange={handleChange}
          />
          {errors.name && touched.name && <h2>{errors.name}</h2>}
          <label>Email</label>
          <Field
            autoComplete="off"
            type="email"
            name="email"
            value={email}
            validate={validateEmail}
            onChange={handleChange}
          />
          {errors.email && touched.email && <h2>{errors.email}</h2>}
          <label>Password</label>
          <Field
            type="password"
            name="password"
            value={password}
            validate={validateText}
            onChange={handleChange}
          />
          {errors.password && touched.password && <h2>{errors.password}</h2>}
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
    // <form onSubmit={handleSubmit}>
    //   <label>
    //     <input
    //       type="text"
    //       name="name"
    //       value={username}
    //       required
    //       onChange={handleChange}
    //     />
    //   </label>
    //   <label>
    //     <input
    //       type="email"
    //       name="email"
    //       value={email}
    //       required
    //       onChange={handleChange}
    //     />
    //   </label>
    //   <label>
    //     <input
    //       type="password"
    //       name="password"
    //       value={password}
    //       required
    //       onChange={handleChange}
    //     />
    //   </label>
    //   <button type="submit">Submit</button>
    // </form>
  );
};
export default RegForm;
