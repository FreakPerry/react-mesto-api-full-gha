function ImagePopup({ isOpen, onClose, card }) {
  return (
    <div
      className={`popup popup_bg-opacity ${isOpen ? 'popup_is-opened' : ''}`}
      id="popup-card-image"
    >
      <div className="popup__container popup__container_type_figure">
        <figure className="popup__figure">
          <img src={card ? card.link : ''} alt={card.name} className="popup__image" />
          <figcaption className="popup__caption">{card.name}</figcaption>
        </figure>
        <button
          className="popup__close-button button"
          type="button"
          id="pup-img-cls-btn"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
