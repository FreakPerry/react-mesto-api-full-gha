import { Link } from 'react-router-dom';
import { useState } from 'react';

function Register({ onRegister }) {
  const [userData, setUserData] = useState({ email: '', password: '' });

  const handleChange = e => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(userData);
  }

  return (
    <div>
      <div className="register">
        <h1 className="register__title">Регистрация</h1>
        <form onSubmit={handleSubmit} className="register__form">
          <fieldset className="register__form-fieldset">
            <input
              type="email"
              name="email"
              className="register__input"
              placeholder="Email"
              value={userData.email || ''}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              className="register__input"
              placeholder="Пароль"
              value={userData.password || ''}
              onChange={handleChange}
              required
            />
          </fieldset>
          <button type="submit" className="button register__button">
            Зарегистрироваться
          </button>
        </form>
        <p className="register__text">
          Уже зарегистрированы?{' '}
          <Link to="/sign-in" className="register__text">
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
