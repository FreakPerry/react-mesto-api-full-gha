import CurrentUserContext from '../contexts/CurrentUserContext';
import { useContext } from 'react';

const hidden = {
  display: 'none'
};

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const user = useContext(CurrentUserContext);

  const isOwn = card.owner !== user._id;

  const isLiked = card.likes.some(i => i === user._id);

  const cardLikeButtonClassName = `button card__like-button ${
    isLiked && 'card__like-button_active'
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <article className="card">
      <img
        style={{ backgroundImage: `url(${card.link})` }}
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="card__info">
        <h2 className="card__description">{card.name}</h2>
        <div className="card__like-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <p className="card__like-counter">{card.likes.length}</p>
        </div>
      </div>
      <button
        className="card__delete-button button"
        type="button"
        style={isOwn ? hidden : null}
        onClick={handleDeleteClick}
      />
    </article>
  );
}

export default Card;
