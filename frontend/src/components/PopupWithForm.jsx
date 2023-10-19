function PopupWithForm({ title, name, children, isOpen, onClose, buttonText, onSubmit }) {
  return (
    <div className={`popup ${isOpen ? 'popup_is-opened' : ''}`} id={`popup-${name}`}>
      <div className="popup__container">
        <button
          className="button popup__close-button"
          type="button"
          id={`${name}-close-button`}
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" name={`${name}-form`} noValidate onSubmit={onSubmit}>
          {children}
          <button className="popup__save-button" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
