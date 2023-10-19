import { useContext } from 'react';
import Card from './Card.jsx';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards
}) {
  const profileContext = useContext(CurrentUserContext);
  const { name, avatar, about } = profileContext;

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar" onClick={onEditAvatar}>
          <img className="profile__avatar-img" src={avatar} alt="аватар" />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{name ?? 'Elisei Tatarenko'}</h1>
          <p className="profile__about">{about ?? 'Frontend developer'}</p>
          <button
            className="button profile__edit-button"
            type="button"
            onClick={onEditProfile}
          ></button>
        </div>
        <button className="button profile__add-button" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="cards">
        {cards.map(card => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
