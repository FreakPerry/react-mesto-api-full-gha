import { Link, Route, Routes } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header({ email, onLogout }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />
      <Routes>
        <Route
          path="/sign-up"
          element={
            <Link to={'/sign-in'} className="header__link">
              Войти
            </Link>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Link to={'/sign-up'} className="header__link">
              Регистрация
            </Link>
          }
        />
        <Route
          path="/"
          element={
            <>
              <div className="header__user-info">
                <p className="header__email">{email}</p>
                <Link to={'/sign-in'} className="header__logout" onClick={onLogout}>
                  Выйти
                </Link>
              </div>
            </>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
