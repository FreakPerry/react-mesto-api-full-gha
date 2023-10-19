import successImage from '../images/agree.svg';
import unsuccessImage from '../images/disagree.svg';

function InfoToolTip({ onClose, isOpen, success }) {
  return (
    <div className={`popup ${isOpen ? 'popup_is-opened' : ''}`}>
      <div className="popup__container popup__container_success">
        <button className="button popup__close-button" type="button" onClick={onClose} />
        {success && (
          <>
            <img
              src={successImage}
              alt="Регистрация прошла успешно"
              className="popup__register-image"
            />
            <p className="popup__title popup__title_success-message">
              Вы успешно зарегистрировались!
            </p>
          </>
        )}
        {!success && (
          <>
            <img src={unsuccessImage} alt="Что-то пошло не так" className="popup__register-image" />
            <p className="popup__title popup__title_success-message">
              Что-то пошло не так! Попробуйте еще раз.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default InfoToolTip;
