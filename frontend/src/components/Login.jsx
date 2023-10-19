import { useState } from 'react';

function Login({ onLogin }) {
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
    onLogin(userData);
  }

  return (
    <div>
      <div className="login">
        <h1 className="login__title">Вход</h1>
        <form className="login__form" onSubmit={handleSubmit}>
          <fieldset className="login__form-fieldset">
            <input
              type="email"
              name="email"
              className="login__input"
              placeholder="Email"
              value={userData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              className="login__input"
              placeholder="Пароль"
              value={userData.password}
              onChange={handleChange}
              required
            />
          </fieldset>
          <button type="submit" className="button login__button">
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
