import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { useEffect, useState } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import { api } from '../utils/Api.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import * as authApi from '../utils/ApiAuth.js';
import { ProtectedRoute } from './ProtectedRoute';
import InfoToolTip from './InfoToolTip';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await api.getUserInfo();
      setCurrentUser(res);
    } catch (e) {
      console.warn(e);
    }
  };

  const fetchCards = async () => {
    try {
      const res = await api.getInitialCards();
      setCards(res);
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchCards();
  }, [isLoggedIn]);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = card => {
    setSelectedCard(card);
    setIsImageOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImageOpen(false);
    setIsInfoToolTipOpen(false);
  };

  const handleCardLike = async card => {
    const isLiked = card.likes.some(i => i === currentUser._id);
    try {
      const resChangeLikeStatus = await api.changeLikeCardStatus(card, !isLiked);
      setCards(state => state.map(c => (c._id === card._id ? resChangeLikeStatus : c)));
    } catch (e) {
      console.warn(e);
    }
  };

  const handleCardDelete = async card => {
    console.log(card);
    try {
      await api.deleteCard(card._id);
      setCards(cards => cards.filter(c => c._id !== card._id));
      closeAllPopups();
    } catch (e) {
      console.warn(e);
    }
  };

  const handleUpdateUser = async data => {
    try {
      const changedProfile = await api.editUserInfo(data);
      setCurrentUser(changedProfile);
      closeAllPopups();
    } catch (e) {
      console.warn(e);
    }
  };

  const handleUpdateAvatar = async data => {
    try {
      const changedAvatar = await api.editAvatar(data);
      setCurrentUser(changedAvatar);
      closeAllPopups();
    } catch (e) {
      console.warn(e);
    }
  };

  const handleAddPlacesubmit = async data => {
    try {
      const newCard = await api.addCards(data);
      setCards([newCard, ...cards]);
      closeAllPopups();
    } catch (e) {
      console.warn(e);
    }
  };

  const checkToken = async () => {
    try {
      await authApi.getContent();
      const userEmail = localStorage.getItem('userEmail');
      setEmail(userEmail);
      setIsLoggedIn(true);
      navigate('/', { replace: true });
    } catch (e) {
      console.warn(e);
      navigate('/sign-in', { replace: true });
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  const handleLogout = async () => {
    try {
      await authApi.logout();
      localStorage.clear();
      setEmail('');
      setIsLoggedIn(false);
      setCurrentUser({});
      navigate('/sign-in', { replace: true });
    } catch (e) {
      console.warn(e);
    }
  };

  const handleLogin = async dataLogin => {
    try {
      await authApi.login(dataLogin);
      const userEmail = dataLogin.email;
      setIsLoggedIn(true);
      localStorage.setItem('userEmail', userEmail);
      setEmail(userEmail);
      navigate('/', { replace: true });
    } catch (e) {
      console.warn(e);
      setSuccess(false);
      setIsInfoToolTipOpen(true);
      setIsLoggedIn(false);
    }
  };

  const handleRegister = async dataRegister => {
    try {
      await authApi.register(dataRegister);
      setSuccess(true);
      setIsInfoToolTipOpen(true);
      navigate('/sign-in', { replace: true });
    } catch (e) {
      console.warn(e);
      setSuccess(false);
      setIsInfoToolTipOpen(true);
    }
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={email} onLogout={handleLogout} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                />
              </ProtectedRoute>
            }
          />
          <Route path="/sign-up" element={<Register onRegister={handleRegister} />} />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
        </Routes>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        ></EditProfilePopup>
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlacesubmit}
        ></AddPlacePopup>
        <PopupWithForm
          title={'Вы уверены?'}
          name={'confirm'}
          onClose={closeAllPopups}
          buttonText={'Да'}
        >
          <button type="submit" className="popup__save-button">
            Да
          </button>
        </PopupWithForm>
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        ></EditAvatarPopup>
        <ImagePopup isOpen={isImageOpen} onClose={closeAllPopups} card={selectedCard} />
        <InfoToolTip isOpen={isInfoToolTipOpen} onClose={closeAllPopups} success={success} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
